# 💍 Royal Wedding Digital Invitation (Varsha & Karan)

Ek ultra-luxurious, interactive aur modern royal wedding web page jo exactly aapke reference video (Instagram Reel) jaisa banaya gaya hai. Yeh page 100% responsive hai aur Vercel par direct upload / deploy ke liye ready hai.

---

## 📅 Wedding Schedule & Functions:

1. **Ubtan Utsav (Haldi)**:
   - **Date**: 24th November, 2026
   - **Time**: 10:00 AM onwards
   - **Theme**: Yellow Pehnawa 💛

2. **Dance, Dhol and Dhamaka (Sangeet)**:
   - **Date**: 24th November, 2026
   - **Time**: 7:00 PM onwards
   - **Theme**: Chamak Dhamak ✨

3. **Varmala & Phere (Wedding Ceremony)**:
   - **Date**: 25th November, 2026
   - **Time**: 8:00 PM onwards
   - **Venue**: Samarambh Lawn and Banquets, Ghodbunder Road, Opp. CNG Pump, Owale, Thane West - 400615 📍

4. **RSVP & Contact Numbers**:
   - `+91 97692 66286`
   - `+91 82912 55240`
   - `+91 97027 01356`
   *(Page par in sabhi numbers ke direct Call aur WhatsApp buttons diye gaye hain).*

---

## ✨ Features (Jo Reel Me Dikhe The & Extra Add-ons)

1. **Royal Double Doors Unveil (3D Animation)**:
   - Gold lace seam ke sath royal doors jo "TAP TO OPEN" wax seal click karte hi smoothly open hote hain.
   - Pardo (curtains) ke hatne ka realistic satin effect.
2. **Background Music / Wedding Song**:
   - Reel ka original romantic audio track (`wedding-music.mp4`) automatically play hota hai jab guest "TAP TO OPEN" par click karta hai.
   - Floating music pill with animated equalizer bars aur mute/unmute control.
3. **Palace Courtyard Arch & Fountain**:
   - Marble fountain, blush roses aur royal canopy ka high-end royal wedding stationery look.
4. **Interactive Scratch to Reveal Card**:
   - HTML5 Canvas powered metallic glitter heart!
   - Guests apni ungli (mobile touch) ya mouse cursor se heart scratch karte hain to date aur "Our forever begins" reveal hota hai.
   - 45% scratch hote hi colorful confetti burst hota hai.
5. **Save The Date**:
   - 1-Click "Add to Google Calendar" button.
   - Apple Calendar, Outlook, aur Google ke liye `.ics` file download option.
6. **Romantic Photo Carousel**:
   - Touch swipeable memories slider with gold rings, palace courtyard, and grand ballroom.
7. **Live Countdown Timer**:
   - Real-time Days, Hours, Minutes, Seconds countdown to November 30, 2026.
8. **Program Timeline**:
   - Dotted vertical timeline (Guest Arrival, Wedding Ceremony, Reception).
9. **Venue & Google Maps**:
   - Grand Palace Hall, London with embedded map, "View on Google Maps" and "Copy Address" button.
10. **Dress Code Swatches**:
    - Pastel shades for Women & Formal suits for Men with interactive color swatches.
11. **Pre-Wedding Events**:
    - Mehndi (Nov 28) & Haldi (Nov 29) details.
12. **Travel & Hotel Booking Code**:
    - Central station shuttle service & Grand Palace Hotel promo code `WEDDING2026` with 1-click copy.
13. **Full Interactive RSVP Form**:
    - Guest name, email, Joyfully Accept / Regretfully Decline, guest count, wishes.
    - Submit par celebratory confetti modal aur browser storage.
    - Host Guestlist viewer button (RSVPs dekhne aur CSV export karne ke liye).
14. **🎨 5 Regal Themes Switcher (Aapke Mutabiq Customize Karne Ke Liye)**:
    - 🌿 **Sage & Royal Gold** (Reel wala original forest green & gold theme)
    - 🍷 **Imperial Ruby & Champagne Gold** (Royal velvet maroon & antique gold)
    - 🌸 **Blush Rose & Pearl Gold** (Romantic peony pink & soft rose gold)
    - 🌌 **Midnight Royal & Starlight** (Opulent deep sapphire navy & shimmer gold)
    - ⚜️ **Palace Ivory & Antique Gold** (Classical cream, taupe & palace gold)

---

## 🚀 Vercel Par Upload / Deploy Kaise Karein (Sirf 2 Minute Me)

Yeh project 100% static aur lightweight hai (No build steps required). Vercel par ise deploy karne ke **3 aasan tareeqe** hain:

### Tareeqa 1: Vercel Dashboard Drag & Drop (Sabse Aasan)
1. Browser me **[vercel.com](https://vercel.com)** par jayein aur login karein.
2. **Add New...** -> **Project** par click karein.
3. Agar aap Vercel CLI use nahi kar rahe, toh **GitHub** par ek new repository banayein aur is folder ki files upload karke Vercel me import kar lijiye. Vercel automatically 10 seconds me live link de dega!

### Tareeqa 2: GitHub se Vercel (Recommended)
1. Apne GitHub account par ek new repository create karein (jaise `wedding-invite`).
2. Is folder ke contents push karein:
   ```bash
   git init
   git add .
   git commit -m "Royal wedding invite"
   git branch -M main
   git remote add origin https://github.com/AAPKA_USERNAME/wedding-invite.git
   git push -u origin main
   ```
3. Vercel dashboard par jayein, **Import** par click karein aur apni repo select karein.
4. **Deploy** button dabayein — aapki website live ho jayegi (e.g. `zayn-nora-wedding.vercel.app`)!

### Tareeqa 3: Vercel CLI (Command Line)
Terminal me run karein:
```bash
npm i -g vercel
vercel
```
Aur prompts follow karein. 30 seconds me live URL mil jayega!

---

## 💻 Apne Computer Par Local Preview Kaise Karein

Kisi bhi browser (Chrome, Edge, Brave, Safari) me simply **`index.html`** file ko double-click karke open karein!

---

## 📝 Details Kaise Edit Karein (Names, Dates, Venue)

Agar aapko Dulha/Dulhan ke naam, tareekh ya address badalna ho:
- **`index.html`** ko kisi bhi text editor (VS Code, Notepad) me open karein.
- `Zayn` aur `Nora` ko replace karke naye naam likhein.
- `November 30, 2026` ko apni shaadi ki date se update karein.
- `script.js` ke andar line 301 par countdown date change kar sakte hain:
  ```js
  const targetDate = new Date('2026-11-30T11:00:00').getTime();
  ```
