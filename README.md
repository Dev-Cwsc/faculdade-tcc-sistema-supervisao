# Sobre

Esta aplicação permite (com as devidas adaptações na implementação) monitorar e controlar quaisquer dispositivos gerenciadores de energia que sejam capazes de se comunicar através do protocolo HTTP. Foi implementada utilizando a biblioteca JSON Server para simular uma REST API, em conjunto com a biblioteca React para construir a interface do usuário. A aplicação conta com uma tela de login que utiliza autenticação de senha por meio de regex. Além disso, apresenta uma tela principal que exibe os dados de consumo de dispositivos medidores de corrente, uma tela de detalhamento de consumo e várias outras telas para cadastrar dispositivos, entre outras funcionalidades disponíveis.

# About

This application allows (with the necessary adaptations in the implementation) monitoring and controlling any energy management devices that are capable of communicating through the HTTP protocol. It was implemented using the JSON Server library to simulate a REST API, in conjunction with the React library to build the user interface. The application features a login screen that utilizes password authentication through regex. Additionally, it presents a main screen that displays the consumption data of current measuring devices, a consumption details screen, and several other screens for device registration, among other available functionalities.

# Como usar?

* Instale o [Node.js](https://nodejs.org/en/)
* Baixe o projeto ou faça um clone do repositório em sua máquina. Após baixar, abra a pasta do projeto pelo terminal
* Execute o comando `npm install` para instalar as dependências necessárias
* Execute o comando `npm start` para iniciar a aplicação

# Simulando um dispositivo gerenciador de energia para testes

Junto com a aplicação descrita, foi implementado um código em JavaScript que simula um dispositivo gerenciador de energia enviando dados de consumo. Para iniciar uma instância do script de simulação, basta executar o arquivo **FakeDevice.js** passando como parâmetro de execução um id e um nome quaisquer para o dispositivo e um nome qualquer para a instalação. Exemplo: `node FakeDevice.js 123456789 "dispositivo de teste 1" "biblioteca"`