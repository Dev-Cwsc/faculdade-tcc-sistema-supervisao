#include <WiFi.h>            // Biblioteca do ESP32 para conexão Wi-Fi
#include <HTTPClient.h>      // Biblioteca para fazer solicitações HTTP
#include <BluetoothSerial.h> // Biblioteca para comunicação Bluetooth
#include <LiquidCrystal.h>   // Biblioteca para controlar o LCD
#include <NTPClient.h>
#include <WiFiUdp.h>

const char *SSID = "TCC - Sistema Modular";                    // Nome da rede Wi-Fi
const char *PWD = "testando1997";                // Senha da rede Wi-Fi
char *serverName = "http://10.0.0.100:3001/3885893f3c95bd153cd3deebabdd1e493d7091b216ef8c15d28ec2ae2ab64b850c1182f1eebb16cf3e4bb11625bf1e04b70f5a31030547cdcdb3eb2a2e313682"; // Endereço do servidor
const long interval = 1000;                         // Intervalo de tempo entre as execuções em milissegundos
unsigned long time_now = 0;                         // Armazena o tempo da última execução
String data = "";
String formattedDate;
bool connected;

BluetoothSerial SerialBT;                // Objeto para comunicação Bluetooth
LiquidCrystal lcd(32, 23, 14, 13, 2, 4); // Objeto de tela LCD
WiFiServer server(80);

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);

void connectToBluetoothDevice()
{
  SerialBT.setPin("1234");
  SerialBT.begin("ESP32BT", true); // Inicializa a comunicação Bluetooth com o nome "ESP32BT"
  // Verifica se o dispositivo "HC-06" está pareado e conecta-se automaticamente

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Conectando a");
  lcd.setCursor(0, 1);
  lcd.print("HC-06...");

  connected = SerialBT.connect("HC-06"); // Conecta-se ao dispositivo

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Conectado com");
  lcd.setCursor(0, 1);
  lcd.print("sucesso!");
}

void connectToWiFi()
{
  lcd.clear();
  lcd.print("Conectando-se a ");
  lcd.setCursor(0, 1);
  lcd.print(SSID);

  WiFi.begin(SSID, PWD);

  while (WiFi.status() != WL_CONNECTED)
  {
    lcd.print(".");
    delay(500);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Conectado. IP: ");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
}

// função para dividir uma string em um array de strings usando um separador
void splitString(String inputString, char separator, String arr[], int arrSize) {
  int count = 0;
  for (int i = 0; i < inputString.length(); i++) {
    if (inputString.charAt(i) == separator) {
      count++;
      if (count >= arrSize) {
        // o array está cheio, então para de adicionar mais elementos
        return;
      }
    } else {
      arr[count] += inputString.charAt(i);
    }
  }
}

void setup()
{
  Serial.begin(115200);       // Inicializa a comunicação serial
  lcd.begin(16, 2);           // Inicializa a tela LCD
  connectToBluetoothDevice(); // Conecta-se ao Bluetooth
  delay(1000);
  connectToWiFi(); // Conecta-se à rede Wi-Fi
  server.begin();  // Inicializa o servidor para receber os dados via Wi-Fi
  timeClient.begin();
  // Set offset time in seconds to adjust for your timezone, for example:
  // GMT +1 = 3600
  // GMT +8 = 28800
  // GMT -1 = -3600
  // GMT 0 = 0
  timeClient.setTimeOffset(3600);
}

void loop()
{
  // Obtém o tempo atual em milissegundos

  WiFiClient client = server.available();

  if (client) // Se um cliente se conectar ao ESP para enviar dados
  {
    String request = client.readStringUntil('\r'); // Lê a requisição

    // Envia a resposta de volta ao cliente
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("");
    client.println("<!DOCTYPE HTML>");
    client.println("<html>");
    client.println("<body>");
    client.println("<h1> Olá, sua requisição foi recebida!</h1>");
    client.println("</body>");
    client.println("</html>");

    // Extrai os dados da requisição e envia o comando via Bluetooth
    int start = request.indexOf("data=") + 5;
    int end = request.indexOf("&", start);
    data = request.substring(start, end);
    SerialBT.println(data);
  }
  // Verifica se já passou tempo suficiente desde a última execução
  if (millis() - time_now >= interval)
  {
    // Armazena o tempo atual como o último tempo de execução
    time_now = millis();

    // Verifica se há dados disponíveis no Bluetooth
    if (SerialBT.available())
    {
      // Lê a string enviada pelo Bluetooth até encontrar o caractere '\n'

      String bt_data = SerialBT.readString();
      String arr_bt_data[7];
      splitString(bt_data, ';', arr_bt_data, 7);

      while (!timeClient.update())
      {
        timeClient.forceUpdate();
      }

      formattedDate = timeClient.getFormattedTime();

      String consumption_data = "{ \"id\": \"" + arr_bt_data[0] + "\"," +
                                "\"device_name\": \"" + arr_bt_data[1] + "\"," +
                                "\"installation_name\": \"" + arr_bt_data[2] + "\"," +
                                "\"measurement_ch1\": \"" + arr_bt_data[3] + "\"," +
                                "\"measurement_ch2\": \"" + arr_bt_data[4] + "\"," +
                                "\"status_ch1\": \"" + arr_bt_data[5] + "\"," +
                                "\"status_ch2\": \"" + arr_bt_data[6] + "\"," +
                                "\"last_update\": \"" + formattedDate + "\"}";

      // Faz uma solicitação HTTP POST para enviar o valor lido do Bluetooth para o servidor
      HTTPClient http;
      const char *address = strcat(serverName, arr_bt_data[0].c_str());
      http.begin(address);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      int httpResponseCode = http.PUT(consumption_data);
      http.end();

      // Verifica o código de resposta HTTP
      if (httpResponseCode == HTTP_CODE_OK)
      {
        Serial.printf("Código de resposta HTTP POST: %d\n", httpResponseCode);
      }
      else
      {
        Serial.printf("Falha na solicitação HTTP POST: %d\n", httpResponseCode);
      }
    }
  }
}