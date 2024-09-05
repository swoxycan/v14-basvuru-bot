
# 🌟 Yetkili Başvuru Botu

Bu bot, Discord sunucunuz için etkili bir yetkili başvuru sistemi sunar. Kullanıcılar başvuru yapabilir, yetkililer başvuruları kabul veya reddedebilir, ve her işlem otomatik olarak yönetilir! 🚀

## ✨ Özellikler

- **📋 Başvuru Sistemi:** Kullanıcılar tek bir tıkla "Başvuru Yap" butonuna basarak hızlıca başvuru yapabilirler. Başvurular özel bir kanal üzerinden yetkililere iletilir.
  
- **✅ Onay/Reddetme:** Yetkililer, başvuruları kolayca "Kabul Et" veya "Reddet" butonlarına basarak yönetebilir. Kabul edilen kullanıcılara yetkili rolü otomatik atanırken, reddedilenler bilgilendirilir.

- **📨 Otomatik Mesajlar:** Başvuru durumu hakkında kullanıcılara otomatik olarak özelleştirilmiş mesajlar gönderilir:
  - **Kabul Mesajı:** "🎉 Tebrikler! Başvurunuz kabul edildi ve ekibimize katıldınız!"
  - **Red Mesajı:** "😞 Maalesef başvurunuz reddedilmiştir. Gelecekte tekrar başvurabilirsiniz."

- **🏷️ Yetki Rolü:** Kabul edilen kullanıcılara sunucu yönetimi tarafından belirlenen özel yetki rolü otomatik olarak atanır. 🎖️

- **🔔 Bildirim Sistemi:** Tüm başvuru ve kararlar, log kanalında raporlanır. Böylece, her şey kayıt altında tutulur ve izlenebilir.

- **📊 Esnek ve Özelleştirilebilir:** Botun davranışları ve mesaj içerikleri, `config.js` dosyası üzerinden kolayca düzenlenebilir. Botu kendi ihtiyaçlarınıza göre tamamen uyarlayabilirsiniz!

## 🚀 Kurulum

1. **Depoyu klonlayın:**

   ```bash
   git clone https://github.com/swoxycan/v14-basvuru-bot.git
   cd v14-basvuru-bot
   ```

2. **Gerekli paketleri yükleyin:**

   ```bash
   npm install
   ```

3. **🔧 `config.js` dosyasını düzenleyin:**

   Botun düzgün çalışabilmesi için `config.js` dosyasını açın ve gerekli bilgileri doldurun:

   ```js
   module.exports = {
       token: "BOT_TOKENINIZ",
       prefix: "+",
       Footer: "Developed By Swoxycan ❤️",
       guildID: "SUNUCU_ID",
       basvuruYt: "YETKILI_ROLU_ID",
       yetkiRolleri: "KABUL_EDILEN_KULLANICI_ROLU_ID",
       logKanalı: "LOG_KANALI_ID",
       basvuruDurum: "BASVURU_DURUM_KANALI_ID"
   }
   ```

   Bu bilgileri Discord Developer Portal'dan veya sunucu ayarlarınızdan alabilirsiniz.

4. **Botu Başlatın:**

   ```bash
   node index.js
   ```

## 📚 Kullanım

1. **📥 Başvuru Başlatma:**
   Kullanıcılar, belirlenen kanal üzerindeki "Başvuru Yap" butonuna basarak başvuruyu başlatabilir. Bot, kullanıcıdan gerekli bilgileri alarak başvuruyu işler.

2. **🛠️ Başvuruları Yönetme:**
   Yetkililer, gelen başvuru mesajı altındaki "Kabul Et" veya "Reddet" butonları ile başvuruları yönetebilir. Her işlem otomatik olarak kaydedilir ve kullanıcılara bildirilir.

3. **📝 Özelleştirme:** 
   Tüm mesajlar ve sistem davranışları, `config.js` dosyası üzerinden kolayca özelleştirilebilir.

## 🛠 Gereksinimler

- **Node.js** v16.9.0 veya daha üstü 🖥️
- **Discord.js** v14 📦

## 🙌 Geri Bildirim ve Katkıda Bulunma

Her türlü katkı, öneri ve geri bildirimleriniz için lütfen bir [issue](https://github.com/swoxycan/v14-basvuru-bot/issues) açın veya bir pull request gönderin. 💬

## 📜 Lisans

Bu proje **GPL Lisansı** altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın. 📄
