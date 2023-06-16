// Comando exemplo para usar: node FakeDevice.js 123456789 "dispositivo de teste 1" "biblioteca" (node FakeDevice.js "id_dispositivo" "nome_dispositivo" "nome_instalação")
const HASH_DEVICES = "3885893f3c95bd153cd3deebabdd1e493d7091b216ef8c15d28ec2ae2ab64b850c1182f1eebb16cf3e4bb11625bf1e04b70f5a31030547cdcdb3eb2a2e313682";

function FakeDevice() {
    setInterval(async () => {
        let c_date = new Date();
        let ch1 = Math.random() * 6;
        let ch2 = Math.random() * 6;

        const RESPONSE = await fetch("http://localhost:8080/device/measurement", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "id": process.argv[2],
                    "deviceName": process.argv[3],
                    "installationName": String(process.argv[4]),
                    "measurementCH1": ch1,
                    "measurementCH2": ch2,
                    "lastCH1Status": true,
                    "lastCH2Status": false,
                    "lastUpdate": c_date
                }
            )
        });
        const DATA = await RESPONSE.json();
        console.log(DATA);
    }, 2000);
}

FakeDevice();