// Comando exemplo para usar: node FakeDevice.js 1 true false (node FakeDevice.js "id_dispositivo" "status_canal_1" "status_canal_2")

function FakeDevice() {
    setInterval(async () => {
        let ch1 = process.argv[3] === "true" ? Math.random() * 6 : 0;
        let ch2 = process.argv[4] === "true" ? Math.random() * 6 : 0;

        const RESPONSE = await fetch("http://localhost:8080/device/measurement", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "id": process.argv[2],
                    "measurementCH1": ch1,
                    "measurementCH2": ch2,
                    "ch1Status": process.argv[3] === "true" ? process.argv[3] : false,
                    "ch2Status": process.argv[4] === "true" ? process.argv[4] : false
                }
            )
        });
        const DATA = await RESPONSE.json();
        console.log(DATA);
    }, 2000);
}

FakeDevice();