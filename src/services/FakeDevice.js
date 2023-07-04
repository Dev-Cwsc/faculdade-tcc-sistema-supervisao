// Comando exemplo para usar: node FakeDevice.js 123456789 "dispositivo de teste 1" "biblioteca" (node FakeDevice.js "id_dispositivo" "nome_dispositivo" "nome_instalação")

function FakeDevice() {
    setInterval(async () => {
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
                    "device": process.argv[3],
                    "installation": String(process.argv[4]),
                    "measurementCH1": ch1,
                    "measurementCH2": ch2,
                    "ch1Status": true,
                    "ch2Status": false
                }
            )
        });
        const DATA = await RESPONSE.json();
        console.log(DATA);
    }, 2000);
}

FakeDevice();