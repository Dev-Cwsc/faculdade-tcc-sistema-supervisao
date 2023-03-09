// Comando exemplo para usar: node FakeDevice.js 123456789 "dispositivo de teste 1" "biblioteca" (node FakeDevice.js "id_dispositivo" "nome_dispositivo" "nome_instalação")
const HASH_DEVICES = "3885893f3c95bd153cd3deebabdd1e493d7091b216ef8c15d28ec2ae2ab64b850c1182f1eebb16cf3e4bb11625bf1e04b70f5a31030547cdcdb3eb2a2e313682";

function FakeDevice() {
    setInterval(async () => {
        let c_date = new Date();
        let ch1 = Math.random() * 6;
        let ch2 = Math.random() * 6;

        const RESPONSE = await fetch("http://localhost:3001/" + HASH_DEVICES + "/" + process.argv[2], {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "id": process.argv[2],
                    "device_name": process.argv[3],
                    "installation_name": String(process.argv[4]),
                    "measurement_ch1": ch1,
                    "measurement_ch2": ch2,
                    "status_ch1": true,
                    "status_ch2": false,
                    "last_update": c_date
                }
            )
        });
        const DATA = await RESPONSE.json();
        console.log(DATA);
    }, 2000);
}

FakeDevice();