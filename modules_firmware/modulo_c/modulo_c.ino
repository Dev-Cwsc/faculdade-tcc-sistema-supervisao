#include <WiFi.h>             // Biblioteca do ESP32 para conexão Wi-Fi
#include <HTTPClient.h>       // Biblioteca para fazer solicitações HTTP
#include <BluetoothSerial.h>  // Biblioteca para comunicação Bluetooth
#include <LiquidCrystal.h>    // Biblioteca para controlar o LCD

const char *SSID = "_CW$C_2.4G";                   // Nome da rede Wi-Fi
const char *PWD = "RedBlackTree659";               // Senha da rede Wi-Fi
const char *serverName = "http://exemplo.com.br";  // Endereço do servidor
String data = "";
bool connected;

BluetoothSerial SerialBT;                 // Objeto para comunicação Bluetooth
LiquidCrystal lcd(32, 23, 14, 13, 2, 4);  // Objeto de tela LCD
WiFiServer server(80);

unsigned long time_now = 0;  // Armazena o tempo da última execução
const long interval = 1000;        // Intervalo de tempo entre as execuções em milissegundos

void connectToBluetoothDevice() {
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

void connectToWiFi() {
  lcd.clear();
  lcd.print("Conectando-se a ");
  lcd.setCursor(0, 1);
  lcd.print(SSID);

  WiFi.begin(SSID, PWD);

  while (WiFi.status() != WL_CONNECTED) {
    lcd.print(".");
    delay(500);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Conectado. IP: ");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);        // Inicializa a comunicação serial
  lcd.begin(16, 2);            // Inicializa a tela LCD
  connectToBluetoothDevice();  // Conecta-se ao Bluetooth
  delay(1000);
  connectToWiFi();  // Conecta-se à rede Wi-Fi
  server.begin();   // Inicializa o servidor para receber os dados via Wi-Fi
}

void loop() {
  // Obtém o tempo atual em milissegundos

  WiFiClient client = server.available();

  if (client)  // Se um cliente se conectar ao ESP para envia dados
  {
    String request = client.readStringUntil('\r');  // Lê a requisição

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
  if (millis() - time_now >= interval) {
    // Armazena o tempo atual como o último tempo de execução
    time_now = millis();

    // Verifica se há dados disponíveis no Bluetooth
    if (SerialBT.available()) {
      // Lê a string enviada pelo Bluetooth até encontrar o caractere '\n'
      String value = SerialBT.readStringUntil('&');
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Valor recebido: ");
      lcd.setCursor(0, 1);
      lcd.println(value);
      delay(1000);
      // Faz uma solicitação HTTP POST para enviar o valor lido do Bluetooth para o servidor
      HTTPClient http;
      http.begin(serverName);
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      String postData = "valor=" + value;
      int httpResponseCode = http.POST(postData);
      http.end();

      // Verifica o código de resposta HTTP
      if (httpResponseCode == HTTP_CODE_OK) {
        Serial.printf("Código de resposta HTTP POST: %d\n", httpResponseCode);
      } else {
        Serial.printf("Falha na solicitação HTTP POST: %d\n", httpResponseCode);
      }
    }
  }
}