// Comando para usar: node FakeDevice.js "id_dispositivo" "nome_instalação"
function FakeDevice() {
    setInterval(async () => {
        let c_date = new Date();
        let ch1 = Math.random() * 6;
        let ch2 = Math.random() * 6;

        const RESPONSE = await fetch("http://localhost:5000/last_update/" + process.argv[2], {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "id": "123456789",
                    "installation_name": String(process.argv[3]),
                    "measurement_ch1": ch1,
                    "measurement_ch2": ch2,
                    "time": c_date
                }
            )
        });
        const DATA = await RESPONSE.json();
        console.log(DATA);
    }, 2000);
}

FakeDevice();