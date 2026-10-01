const readline = require('readline');

// إعداد واجهة قراءة المدخلات من الـ Terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const apiKey = 'f8a8d1ad4b494d97989103316260110';

// مطالبة المستخدم بإدخال اسم الدولة أو المدينة
rl.question('Please enter a country or city name: ', (countryName) => {

    // التحقق من أن المستخدم لم يدخل قيمة فارغة
    if (!countryName.trim()) {
        console.log("Error: Country name cannot be empty.");
        rl.close();
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${countryName.trim()}`;

    // جلب البيانات باستخدام fetch مع معالجة أخطاء الشبكة والـ API
    fetch(url)
        .then(response => {
            // التحقق من حالة الاتصال أو خطأ في الـ Token أو المدخلات
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status code: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // عرض البيانات المطلوبة بشكل واضح ومقروء
            console.log("\n--- Weather & Location Details ---");
            console.log(`Country / City: ${data.location.name}, ${data.location.country}`);
            console.log(`Temperature: ${data.current.temp_c}°C`);
            console.log(`Latitude (lat): ${data.location.lat}`);
            console.log(`Longitude (lon): ${data.location.lon}`);
            console.log("----------------------------------");
        })
        .catch(error => {
            // معالجة الأخطاء (مثل خطأ في التوكن، اسم دولة غير موجود، أو مشاكل الإنترنت)
            console.error("\n[Error Occurred]:", error.message);
            console.error("Please check your network connection, API token, or the spelling of the country name.");
        })
        .finally(() => {
            rl.close();
        });
});