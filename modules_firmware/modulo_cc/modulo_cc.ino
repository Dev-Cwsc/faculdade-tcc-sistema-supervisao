// Inclusão das bibliotecas
#include "EmonLib.h"        // Biblioteca do monitor de energia
#include <SoftwareSerial.h> // Biblioteca de comunicação serial bluetooth

// Declaração de constantes e variáveis
const int SCT_PIN1 = A7;
const int RX_PIN = 3;
const int TX_PIN = 2;
const int LED = 13;
const int RLY_PIN1 = 4;
const int RLY_PIN2 = 5;
const int PERIOD = 2000;
const double VOLTAGE = 125.3;
int bluetoothData = 0;
unsigned long time_now = 0;
double irms;
String data = "";

// Declaração de objetos
EnergyMonitor SCT013;
SoftwareSerial bluetooth(RX_PIN, TX_PIN);

void setup()
{
  SCT013.current(SCT_PIN1, 60); // Inicializa o sensor de corrente na porta A7
  bluetooth.begin(9600);        // Inicializa o módulo bluetooth
  Serial.begin(9600);           // Inicializa o monitor serial
  pinMode(RLY_PIN1, OUTPUT);
  pinMode(RLY_PIN2, OUTPUT);
}

void loop()
{
  digitalWrite(RLY_PIN1, LOW);
  digitalWrite(RLY_PIN2, LOW);

  if (bluetooth.available()) // Se o bluetooth estiver ligado
  {
    if (millis() - time_now > PERIOD) // A cada segundo envia os dados de consumo via bluetooth
    {
      time_now = millis();
      irms = SCT013.calcIrms(1480);
      data += String(irms, 2) + ";";             // Mede a corrente no sensor
      data += String((irms * VOLTAGE), 2) + ";"; // Calcula o valor da potência de consumo no momento
      data += String(digitalRead(RLY_PIN1)) + ";";
      data += String(digitalRead(RLY_PIN2)) + ";";
      bluetooth.print(data); // Envia os dados de medição de corrente e potência via bluetooth
    }

    bluetoothData = bluetooth.read(); // VARIÁVEL RECEBE O VALOR ENVIADO PELO BLUETOOTH

    if (bluetoothData == '1')
    {                                                 // Se receber o valor "1" por bluetooth
      digitalWrite(RLY_PIN1, !digitalRead(RLY_PIN1)); // Inverte o estado do relê 1
    }

    if (bluetoothData == '2')
    {                                                 // Se receber o valor "2" por bluetooth
      digitalWrite(RLY_PIN2, !digitalRead(RLY_PIN2)); // Inverte o estado do relê 2
    }
  }
}

void printPowerData(double irms, double power) // Exibe os dados de potência no monitor serial
{
  Serial.print("Corrente = ");
  Serial.print(irms);
  Serial.println(" A");

  Serial.print("Potencia = ");
  Serial.print(power);
  Serial.println(" W");

  delay(500);

  Serial.print(".");
  delay(500);
  Serial.print(".");
  delay(500);
  Serial.println(".");
  delay(500);
}