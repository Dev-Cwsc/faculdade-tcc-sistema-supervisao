# Sobre

Esta aplicação permite (com as devidas adaptações na implementação) monitorar e controlar quaisquer dispositivos gerenciadores de energia que sejam capazes de se comunicar através do protocolo HTTP. Foi implementada utilizando a biblioteca React para construir a interface de interação com o usuário. A aplicação conta com uma tela de login que utiliza autenticação de senha por meio de regex. Além disso, apresenta uma tela principal que exibe os dados de consumo de dispositivos medidores de corrente, uma tela de detalhamento de consumo e várias outras telas para cadastrar dispositivos, entre outras funcionalidades disponíveis.

# About

This application allows (with the necessary adaptations in the implementation) monitoring and controlling any energy management devices that are capable of communicating through the HTTP protocol. It was implemented using the React library to build the user interface. The application features a login screen that utilizes password authentication through regex. Additionally, it presents a main screen that displays the consumption data of current measuring devices, a consumption details screen, and several other screens for device registration, among other available functionalities.

# Como usar?

**_Obs:_** É necessário usar uma API que seja compatível e funcione como backend em conjunto com essa aplicação. Caso queira, você pode baixar a [API](https://github.com/Dev-Cwsc/java-spring-restfull-api) que estou desenvolvendo.

* Certifique-se de que o backend está funcionando corretamente
* Instale o [Node.js](https://nodejs.org/en/)
* Baixe o projeto ou faça um clone do repositório em sua máquina. Após baixar, abra a pasta do projeto pelo terminal
* Execute o comando `npm install` para instalar as dependências necessárias
* Execute o comando `npm start` para iniciar a aplicação

# Simulando um dispositivo gerenciador de energia para testes

Para realizar alguns testes, foi implementado um código em JavaScript que simula um dispositivo gerenciador de energia enviando dados de consumo. Basta executar o arquivo **FakeDevice.js** passando como parâmetro de execução um id e os estados dos canais de leitura (true ou false) para iniciar a simulação. Exemplo: `node FakeDevice.js 1 false true`.