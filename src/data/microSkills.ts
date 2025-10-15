export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
};

export type CategoryType = 
  | 'İş & Kariyer' 
  | 'Teknoloji' 
  | 'Tarih & Kültür' 
  | 'Startup' 
  | 'Yapay Zeka' 
  | 'Yaratıcılık'
  | 'Kişisel Gelişim'
  | 'İletişim';

export type MicroSkill = {
  id: string;
  title: string;
  summary: string;
  category: CategoryType;
  durationMinutes: number;
  isPremium: boolean;
  quiz: QuizQuestion[];
  content?: string;
};

export const MOCK_MICRO_SKILLS: MicroSkill[] = [
  // İLETİŞİM KATEGORİSİ
  {
    id: 'ms-001',
    title: 'Aktif Dinleme',
    summary: 'Dikkatini odaklayarak, ana noktaları yansıtarak ve açıklayıcı sorular sorarak konuşmaları geliştir.',
    category: 'İletişim',
    durationMinutes: 5,
    isPremium: false,
    content: `Aktif dinleme, iletişimin en güçlü araçlarından biridir. Sadece sessizce duymak değil, karşınızdakini gerçekten anlamak için kullanılır.

**Temel Prensipleri:**

1. **Tam Dikkat Ver**: Telefonu bir kenara bırak, göz teması kur. Karşındaki kişiye zamanını verdiğini hissettir.

2. **Beden Dilini Kullan**: Başınla onaylama, öne eğilme ve açık bir duruş, ilgilendiğini gösterir. Kollarını kavuşturmak veya başka yere bakmak olumsuz sinyaller verir.

3. **Özetleme Tekniği**: "Anladığım kadarıyla sen diyorsun ki..." diye başlayarak karşındakinin dediklerini kendi cümlelerinle tekrar et. Bu hem anladığını gösterir hem yanlış anlamaları önler.

4. **Açık Uçlu Sorular Sor**: "Evet/Hayır" ile cevaplanabilecek sorular yerine "Nasıl hissettin?", "Ne düşünüyorsun bu konuda?" gibi sorular sor.

5. **Sabırlı Ol**: Hemen cevap verme veya çözüm sunma isteğine karşı koy. Bazen insanlar sadece dinlenmeye ihtiyaç duyar.

**Gerçek Hayattan Örnek:**
Arkadaşın işten yakınıyor. Hemen "O zaman istifa et" demek yerine:
- "Bu durum seni nasıl etkiliyor?" diye sor
- "Anladığım kadarıyla en çok X durumu seni rahatsız ediyor, doğru mu?"
- Göz teması kur ve empati göster

**Kaçınılması Gerekenler:**
❌ Sözünü kesmek
❌ Hemen tavsiye vermek
❌ Konuyu kendine çevirmek ("Ben de aynısını yaşadım...")
❌ Telefona bakmak
❌ Cevabını kafandan hazırlarken "dinler gibi" yapmak

Aktif dinleme, ilişkileri güçlendirir ve güven inşa eder. Pratik yaptıkça doğal hale gelir!`,
    quiz: [
      {
        id: 'ms-001-q1',
        question: 'Aktif dinlemeyi en iyi hangi davranış gösterir?',
        options: [
          'Konuşurken bir sonraki cevabınızı hazırlamak',
          'Göz teması kurmak ve ana noktayı özetlemek',
          'Hızlı çözüm sunmak için sözü kesmek',
          'Duraklamalarda telefona bakmak',
        ],
        correctOptionIndex: 1,
        explanation: 'Aktif dinlemenin en önemli göstergelerinden biri, karşınızdakiyle göz teması kurmak ve söylediklerini kendi kelimelerinizle özetlemektir. Bu, gerçekten dinlediğinizi ve anladığınızı gösterir. Özetleme yaparken "Anladığım kadarıyla sen şunu söylüyorsun..." gibi cümleler kullanabilirsiniz. Bu teknik, yanlış anlamaları önler ve konuşmacıya değer verildiğini hissettirir.',
      },
      {
        id: 'ms-001-q2',
        question: 'Yararlı bir açıklayıcı soru hangisidir?',
        options: [
          '"Bunu neden yaptın?"',
          '"Tekrar söyler misin?"',
          '"Anladığım kadarıyla sen diyorsun ki... Doğru mu?"',
          '"Katılmıyorum."',
        ],
        correctOptionIndex: 2,
        explanation: 'Açıklayıcı sorular, anladığınızı doğrulamak ve konuşmayı derinleştirmek için kullanılır. "Anladığım kadarıyla sen diyorsun ki..." şeklindeki sorular, karşınızdakinin söylediklerini kendi kelimelerinizle tekrar ederek doğru anladığınızı teyit eder. "Neden?" sorusu savunmacı bir tavır yaratabilir, "Katılmıyorum" bir soru değil karşı çıkmadır. Açıklayıcı sorular her zaman empati ve anlamaya yöneliktir.',
      },
    ],
  },
  
  // İŞ & KARİYER
  {
    id: 'ms-002',
    title: 'Zaman Bloklama Tekniği',
    summary: 'En önemli görevlerin için odaklanmış zaman blokları planla, dikkat dağınıklığını azalt.',
    category: 'İş & Kariyer',
    durationMinutes: 5,
    isPremium: false,
    content: `Zaman bloklama, günün kaosunu düzene sokan güçlü bir tekniktir. Multitasking yerine tek seferde bir işe odaklanmanı sağlar.

**Nasıl Çalışır?**

Gününü önceden belirlenmiş zaman bloklarına bölersin. Her blok belirli bir göreve veya aktiviteye ayrılır.

**Adım Adım Uygulama:**

1. **Sabah Planla** (10 dk): 
   - Gün sonunda ne bitmiş olmalı?
   - Öncelikli 3 görevi belirle
   - Takviminde bloklar oluştur

2. **Blokları Ata**:
   - **9:00-11:00**: Derin iş (kodlama, yazı yazma vb.)
   - **11:00-11:30**: E-posta ve mesajlar
   - **11:30-13:00**: Toplantılar
   - **14:00-16:00**: Yaratıcı iş
   - **16:00-17:00**: Günlük review ve planlama

3. **Blok Kuralları**:
   ✅ Blok boyunca sadece o işe odaklan
   ✅ Bildirimleri kapat
   ✅ "Meşgul" moduna geç
   ✅ Acil olmayan her şeyi sonraya bırak

**Örnek Günlük Plan:**
\`\`\`
8:00-9:00 → Sabah rutini
9:00-11:00 → Derin iş (proje geliştirme)
11:00-11:15 → Mola ☕
11:15-12:00 → E-postalar + mesajlar
12:00-13:00 → Öğle yemeği
13:00-15:00 → Toplantılar
15:00-15:15 → Mola 🚶
15:15-17:00 → İkincil görevler
17:00-17:30 → Yarını planla
\`\`\`

**Pro İpuçları:**
💡 En zor işi sabah en enerjik olduğun saatte yap
💡 Benzer görevleri aynı bloğa grupla (tüm e-postaları birlikte cevapla)
💡 Bloklar arası 5-10 dk mola bırak
💡 İlk hafta %70 gerçekçi hedefle, mükemmel olmaya çalışma

**Yaygın Hatalar:**
❌ Blokları çok kısa tutmak (konsantrasyon süresi gerekir)
❌ Tampon süre bırakmamak (beklenmedik şeyler olur)
❌ Çok katı plan (esneklik önemli)

Zaman bloklama ile verimliliğin %40'a kadar artabilir!`,
    quiz: [
      {
        id: 'ms-002-q1',
        question: 'Zaman bloklamanın ana faydası nedir?',
        options: [
          'Aynı anda birçok görevi yapmak',
          'Karar yorgunluğunu ve dikkat dağınıklığını azaltmak',
          'Çalışma saatlerini süresiz uzatmak',
          'Planlamadan tamamen kaçınmak',
        ],
        correctOptionIndex: 1,
        explanation: 'Zaman bloklamanın en büyük faydası, sürekli "şimdi ne yapmalıyım?" sorusuna cevap aramaktan kurtulmanızdır. Gününüzü önceden planladığınızda, karar yorgunluğu azalır ve her blokta sadece o işe odaklanırsınız. Multitasking verimliliği %40 düşürürken, zaman bloklama %40 artırabilir! Dikkat dağınıklığı azalır çünkü "Şu anda e-posta saatim değil, derin iş vaktim" diyebilirsiniz. Araştırmalar gösteriyor: her görev değişimi beyninizin 15-20 dakika toparlanmasını gerektiriyor. Zaman bloklama bu kayıpları önler.',
      },
      {
        id: 'ms-002-q2',
        question: 'Bloklar arası mola için iyi bir kural hangisidir?',
        options: [
          'Molaya gerek yok',
          'Dikkati sıfırlamak için kısa molalar',
          'Sadece 4 saat sonra mola',
          'Molalar çalışma bloklarından uzun olmalı',
        ],
        correctOptionIndex: 1,
        explanation: 'Zaman bloklama tekniğinde, her blok arasında 5-10 dakikalık kısa molalar vermek çok önemlidir. Bu molalar beyninizin dinlenmesini, bilgilerin pekişmesini ve bir sonraki bloğa odaklanmış başlamanızı sağlar. Uzun molalar momentum kaybına yol açarken, hiç mola vermemek yorgunluğa sebep olur. İdeal bir zaman bloklama planında: 90 dakika çalışma, 10 dakika mola formatı çok etkilidir.',
      },
    ],
  },

  // KİŞİSEL GELİŞİM
  {
    id: 'ms-003',
    title: 'Büyüme Zihniyeti Temelleri',
    summary: 'Zorlukları öğrenme fırsatı olarak gör; çaba, strateji ve geri bildirimlere odaklan.',
    category: 'Kişisel Gelişim',
    durationMinutes: 5,
    isPremium: false,
    content: `Stanford psikolog Carol Dweck'in araştırmalarına dayanan büyüme zihniyeti, başarının anahtarlarından biri.

**İki Farklı Zihniyet:**

**🔒 Sabit Zihniyet (Fixed Mindset):**
- "Yetenekler doğuştandır"
- Başarısızlık = yetersizlik kanıtı
- Zorluktan kaçınma
- Eleştiriye kapanma
- Başkalarının başarısından rahatsız olma

**🌱 Büyüme Zihniyeti (Growth Mindset):**
- "Yetenekler geliştirilebilir"
- Başarısızlık = öğrenme fırsatı
- Zorlukları kucaklama
- Geri bildirimden öğrenme
- Başkalarının başarısından ilham alma

**Büyüme Zihniyetini Geliştirme:**

1. **"Henüz" Kelimesini Ekle**
   - ❌ "Bunu yapamıyorum"
   - ✅ "Bunu henüz yapamıyorum"
   
2. **Sürece Odaklan, Sonuca Değil**
   - ❌ "Sınavdan 80 aldım, kötüydü"
   - ✅ "Çok çalıştım ve bazı konuları öğrendim. Gelecek sefer daha iyi stratejiler deneyeceğim"

3. **Hataları Kutla**
   Her hata, beyninin yeni bağlantılar kurduğu andır.
   "Harika, bir şey öğrenecek olduğum anlamına geliyor!"

4. **Başkalarıyla Karşılaştırma Değil, Kendini Geçmişinle Karşılaştır**
   - Dün bilmediğini bugün biliyor musun? → İlerleme!

**Gerçek Hayattan Örnek:**

**Durum:** Yeni bir dil öğreniyorsun, ilk konuşmada hata yaptın.

❌ Sabit Zihniyet: "Dil öğrenemeyecek kadar aptalım, bırakıyorum."

✅ Büyüme Zihniyeti: "İlk denemem ve konuşma cesareti gösterdim! Hangi hataları yaptım? Bunları nasıl düzeltebilirim? Pratik yaptıkça daha iyi olacağım."

**Beyni Geliştiren Aktiviteler:**
🧠 Yeni beceriler öğrenmek
🧠 Hataları analiz etmek
🧠 Farklı çözüm yolları denemek
🧠 Geri bildirim istemek
🧠 Rahatsızlık zonundan çıkmak

**Unutma:** Beynin kas gibidir. Kullandıkça güçlenir, zorladıkça büyür!

Michael Jordan: "Kariyerimde 9000'den fazla şut kaçırdım. 300'e yakın maç kaybettim. 26 kez son saniye şutunu attım ve ıskalaadım. Defalarca başarısız oldum. İşte bu yüzden başarılıyım."`,
    quiz: [
      {
        id: 'ms-003-q1',
        question: 'Büyüme zihniyeti neyi vurgular?',
        options: [
          'Sadece doğuştan gelen yetenek',
          'Çaba, stratejiler ve geri bildirimlerden öğrenme',
          'Zor görevlerden kaçınma',
          'Her ne pahasına olursa olsun kazanma',
        ],
        correctOptionIndex: 1,
        explanation: 'Büyüme zihniyeti (Growth Mindset), Carol Dweck\'in yıllar süren araştırmasından doğdu: Başarı, doğuştan gelen yetenek değil, çaba, doğru stratejiler ve geri bildirimlerden öğrenmekten gelir. Sabit zihniyetli kişiler "Ben matematikte kötüyüm" der ve çabalamaz. Büyüme zihniyetli kişiler "Henüz iyi değilim, ama doğru çalışma yöntemleriyle öğrenebilirim" der. Nörobilim bu görüşü destekliyor: Beyin plastiktir, yeni beceriler öğrendikçe fiziksel olarak değişir. Çaba beyni güçlendirir, tıpkı kas gibi.',
      },
      {
        id: 'ms-003-q2',
        question: 'Hangi düşünce büyüme zihniyetiyle uyumludur?',
        options: [
          '"Bunu yapamam."',
          '"Başarısız oldum, o yüzden denemekten vazgeçmeliyim."',
          '"Bu zor, yani yeni bir şey öğreniyorum."',
          '"Diğerleri daha iyi, o yüzden pes ediyorum."',
        ],
        correctOptionIndex: 2,
        explanation: 'Büyüme zihniyetine sahip kişiler, zorlukları bir tehdit değil, öğrenme fırsatı olarak görürler. "Bu zor, yani yeni bir şey öğreniyorum" ifadesi tam olarak bu bakış açısını yansıtır. Zorluk karşısında heyecanlanmak, beynin yeni sinir bağlantıları kurduğunun işaretidir. Carol Dweck\'in araştırmaları gösteriyor ki bu zihniyete sahip öğrenciler, sabit zihniyetli akranlarından çok daha başarılı oluyor. Hatırla: "Henüz" kelimesini eklemek her şeyi değiştirir - "Bunu yapamıyorum... henüz!"',
      },
    ],
  },

  // TEKNOLOJİ
  {
    id: 'ms-004',
    title: 'Git Versiyon Kontrolü Temelleri',
    summary: 'Kodunu güvenle yönet: commit, branch ve merge işlemlerinin temellerini öğren.',
    category: 'Teknoloji',
    durationMinutes: 5,
    isPremium: false,
    content: `Git, dünyadaki yazılımcıların %90'ının kullandığı versiyon kontrol sistemidir. Kodunda "zaman makinesi" gibi çalışır.

**Git Nedir ve Neden Önemli?**

Bir proje üzerinde çalışırken:
- Değişiklikleri kaydet ve gerekirse geri al
- Farklı özellikler üzerinde paralel çalış
- Takım arkadaşlarınla çakışma olmadan ortak çalış
- Kodunun her versiyonunu sakla

**Temel Git Akışı:**

**1. Repository (Depo) Oluştur**
\`\`\`bash
git init  # Yeni proje
# veya
git clone [url]  # Mevcut projeyi indir
\`\`\`

**2. Değişiklik Yap ve Kaydet**
\`\`\`bash
# Dosyaları değiştir
git add .  # Tüm değişiklikleri "staging area"ya ekle
git commit -m "Kullanıcı login özelliği eklendi"  # Kalıcı kayıt
\`\`\`

**3. Branch (Dal) ile Çalış**
\`\`\`bash
git branch yeni-ozellik  # Dal oluştur
git checkout yeni-ozellik  # Dala geç
# Değişiklik yap, commit et
git checkout main  # Ana dala dön
git merge yeni-ozellik  # Değişiklikleri birleştir
\`\`\`

**4. Uzak Sunucuyla Senkronize Et**
\`\`\`bash
git push origin main  # Değişikliklerini GitHub'a gönder
git pull origin main  # Başkalarının değişikliklerini al
\`\`\`

**Git'in Süper Gücü: Branch (Dallar)**

Main branch'i (ana dal) bozma korkusu olmadan yeni özellikler geliştirebilirsin:

\`\`\`
main: A---B---C---F---G  (stabil kod)
              \\     /
feature:       D---E     (yeni özellik)
\`\`\`

**Pratik Senaryo:**

Bir e-ticaret sitesi yapıyorsun:

1. **main** dalında çalışan kod var
2. Yeni "sepet" özelliği ekleyeceksin
3. \`git checkout -b sepet-ozelligi\` → yeni dal
4. Sepet kodunu yaz, test et
5. \`git commit -m "Sepet özelliği tamamlandı"\`
6. \`git checkout main\` → ana dala dön
7. \`git merge sepet-ozelligi\` → sepeti ana koda ekle

**En Sık Kullanılan Komutlar:**

\`\`\`bash
git status      # Ne değişti?
git log         # Geçmiş commit'ler
git diff        # Değişiklikleri göster
git branch      # Dalları listele
git checkout -b [dal-adı]  # Yeni dal oluştur ve geç
\`\`\`

**İyi Commit Mesajları:**
✅ "Kullanıcı giriş hatasını düzeltti"
✅ "Dashboard'a grafik eklendi"
❌ "değişiklik"
❌ "fix"
❌ "update"

**Altın Kural:** Sık sık commit et, küçük parçalar halinde. Her commit bir "kayıt noktası"dır.

Git öğrendikten sonra, kodlama yaparken asla "Keşke önceki haline dönsem" demeyeceksin!`,
    quiz: [
      {
        id: 'ms-004-q1',
        question: 'Git\'te "commit" ne işe yarar?',
        options: [
          'Dosyaları siler',
          'Değişiklikleri kalıcı olarak kaydeder',
          'Projeyi internete yükler',
          'Dalları birleştirir',
        ],
        correctOptionIndex: 1,
        explanation: 'Commit, yaptığınız değişiklikleri bir anlık görüntü olarak kaydeder.',
      },
      {
        id: 'ms-004-q2',
        question: 'Branch (dal) kullanmanın amacı nedir?',
        options: [
          'Kodu silmek',
          'Ana kod tabanını etkilemeden yeni özellikler geliştirmek',
          'Projeyi kopyalamak',
          'Hata mesajlarını gizlemek',
        ],
        correctOptionIndex: 1,
        explanation: 'Git\'te branch (dal) kullanmanın ana amacı, ana kod tabanınızı (main/master) bozmadan yeni özellikler geliştirmek, bug düzeltmek veya deneyler yapmaktır. Bir branch açtığınızda, kodun bir kopyası üzerinde özgürce çalışabilirsiniz. Eğer yaptığınız değişiklik başarılı olursa, merge ile ana koda eklersiniz; olmadıysa branch\'i silebilirsiniz. Bu sayede takım çalışmasında her geliştirici kendi branch\'inde çalışır ve çakışmalar minimize edilir. Örnek: "feature/user-authentication" branch\'inde login özelliğini geliştirirken, main branch stabil kalır.',
      },
    ],
  },

  // TARİH & KÜLTÜR
  {
    id: 'ms-005',
    title: 'Rönesans Dönemi ve İnovasyon',
    summary: 'Tarihte yaratıcılık patlaması: Rönesans\'ın bugüne ilham veren özelliklerini keşfet.',
    category: 'Tarih & Kültür',
    durationMinutes: 5,
    isPremium: false,
    content: `Rönesans, Orta Çağ'ın karanlığından aydınlığa geçişin sembolüdür. 14-17. yüzyıl arasında Avrupa'da yaşanan bu "yeniden doğuş", sadece tarihte değil, bugünkü inovasyon kültürünün de temelini attı.

**Rönesans Neydi?**

İtalyanca "yeniden doğuş" anlamına gelen Rönesans:
- Antik Yunan ve Roma'nın bilgi birikimini yeniden keşfetti
- Sanat, bilim, edebiyat ve felsefeyi zirveye taşıdı
- İnsanı ve onun potansiyelini merkeze aldı (Hümanizm)
- Dogmaları sorgulayan düşünce özgürlüğünü getirdi

**Rönesans'ın İnovasyon Dersleri:**

**1. Disiplinler Arası Düşünme**
Leonardo da Vinci hem ressam, hem mühendis, hem anatomistti. "Polimat" olma fikri - birçok alanda bilgili olmak - Rönesans'ın ruhu.

💡 Bugün: Steve Jobs tasarım + teknoloji, Elon Musk fizik + mühendislik + girişimcilik

**2. Merak ve Gözlem**
Galileo gökyüzünü teleskopla gözlemledi ve dünya merkezli evreni yıktı. Merak, tüm buluşların anahtarıydı.

💡 Bugün: Neden sorusunu sorma cesareti, startup dünyasının temeli.

**3. Patronaj Sistemi**
Medici ailesi gibi zenginler sanatçıları ve bilim insanlarını destekledi. Bu sistem yaratıcılığın ilerlemesini sağladı.

💡 Bugün: Girişim sermayesi (VC), hibe programları, Patreon

**Rönesans'ın Ünlü İsimleri:**

🎨 **Leonardo da Vinci**: Mona Lisa'yı resmettiği gibi, uçan makine tasarımları da yaptı. Tam bir polimat.

🔬 **Galileo Galilei**: "Dünya döner" diyerek evrenin merkezini değiştirdi.

✍️ **Shakespeare**: İnsan doğasını analiz eden oyunlarıyla edebiyatı zirveye taşıdı.

🏛️ **Michelangelo**: Sistine Şapeli'nin tavanını boyayarak sanatın sınırlarını genişletti.

**Rönesans'tan Günümüze Taşınan Fikirler:**

✅ **Sorgulama Kültürü**: "Neden?" sorusu her şeyin başlangıcı
✅ **Çok Yönlü Gelişim**: Tek alanda uzman olmak yetmez
✅ **Sanat + Bilim**: Estetik ve işlevsellik bir arada
✅ **İnsan Potansiyeli**: Sınırlar yok, sadece henüz keşfedilmemiş yetenekler var

**Modern "Rönesans" Örnekleri:**

- **Silicon Valley**: Teknoloji + tasarım + girişimcilik füzyonu
- **Maker Hareketi**: Kendi ürününü yarat, paylaş, öğren
- **Açık Kaynak**: Bilgiyi demokratikleştir (tıpkı Gutenberg'in matbaası gibi)

Rönesans bize şunu öğretiyor: Yaratıcılık, farklı alanları birleştirmekten, merak duymaktan ve risk almaktan doğar.

**Alıntı:** "Ben sanatı öğrendim, artık tasarlayabilirim. Ben bilimi öğrendim, artık icat edebilirim." - Leonardo da Vinci mantığı`,
    quiz: [
      {
        id: 'ms-005-q1',
        question: 'Rönesans hangi dönemde yaşandı?',
        options: [
          '10-12. yüzyıl',
          '14-17. yüzyıl',
          '18-19. yüzyıl',
          '20. yüzyıl',
        ],
        correctOptionIndex: 1,
        explanation: 'Rönesans, 14. yüzyılda İtalya\'da (özellikle Floransa\'da) başlayıp 17. yüzyıla kadar süren kültürel ve entelektüel harekettir. "Yeniden doğuş" anlamına gelen bu dönem, Orta Çağ\'ın sona ermesi ve modern çağın başlangıcı olarak kabul edilir. Medici ailesi gibi zengin patronların desteğiyle sanat ve bilim gelişti. Leonardo da Vinci (1452-1519), Michelangelo (1475-1564), Shakespeare (1564-1616) bu dönemin önemli isimleridir. Gutenberg\'in matbaası (1450) bilginin yayılmasını hızlandırdı ve Rönesans Avrupa\'ya yayıldı.',
      },
      {
        id: 'ms-005-q2',
        question: 'Rönesans\'ın önemli özelliği neydi?',
        options: [
          'Sadece askeri gelişmeler',
          'Sanat, bilim ve düşüncede çok yönlü gelişme',
          'Teknolojiden uzaklaşma',
          'Toplumsal izolasyon',
        ],
        correctOptionIndex: 1,
        explanation: 'Rönesans\'ın en belirgin özelliği, çok yönlü bir kültürel patlama yaşanmasıdır. Bu dönemde sadece resim ve heykel değil, bilim, matematik, anatomi, astronomi, edebiyat ve felsefe alanlarında da devrim niteliğinde gelişmeler oldu. Leonardo da Vinci hem sanatçı hem bilim insanıydı; Michelangelo hem heykeltıraş hem mimar. Bu "rönesans insanı" (polimat) kavramı, tek bir alanda değil birçok alanda yetenekli olmayı teşvik etti. Bugünkü multidisipliner yaklaşımların temeli buradadır.',
      },
    ],
  },

  // YAPAY ZEKA (PREMIUM)
  {
    id: 'ms-006',
    title: 'Yapay Zeka Temelleri: Machine Learning',
    summary: 'Makine öğrenmesi nedir? AI\'nın temel kavramlarını 5 dakikada anla.',
    category: 'Yapay Zeka',
    durationMinutes: 5,
    isPremium: true,
    content: `Machine Learning (ML), bilgisayarların deneyimlerinden öğrenerek akıllı kararlar vermesini sağlayan AI dalıdır. Artık hayatımızın her yerinde!

**Machine Learning Nedir?**

Geleneksel programlama: "Eğer X olursa, Y yap" kuralları yazarsın.
Machine Learning: Bilgisayar verilerden kuralları kendisi çıkarır.

**Basit Örnek:**

**Geleneksel Kod:**
\`\`\`
if (email içinde "bedava" var) → Spam
if (email içinde "kazan" var) → Spam
\`\`\`
Problem: Her spam türü için kural yazamazsın.

**Machine Learning:**
- 10,000 spam, 10,000 normal mail göster
- Makine kalıpları öğrensin
- Yeni mail gelince otomatik karar versin

**3 Ana ML Türü:**

**1. Supervised Learning (Denetimli Öğrenme)**
Etiketli verilerle öğrenme.

📧 Örnek: Spam Filtresi
- Gösterilir: Bu spam ✓, Bu normal ✓
- Model öğrenir: Hangi özellikleri spam yapar?
- Test: Yeni mail → %95 doğrulukla tahmin

**2. Unsupervised Learning (Denetimsiz Öğrenme)**
Etiket yok, makine kendi kalıpları bulur.

🛒 Örnek: Müşteri Segmentasyonu
- E-ticaret sitesi, kullanıcı davranışlarına bakar
- Model: "Şu 3 tip müşteri grubu var" diye ayırır
- Sen bile fark etmediğin kalıpları bulur!

**3. Reinforcement Learning (Pekiştirmeli Öğrenme)**
Deneme-yanılma ile öğrenme. Ödül/ceza sistemi.

🎮 Örnek: Oyun Oynayan AI
- AI bir hamle yapar
- Kazandı → +10 puan (ödül)
- Kaybetti → -10 puan (ceza)
- Zamanla en iyi stratejileri öğrenir

**ML Nasıl Çalışır? (Basitleştirilmiş)**

1. **Veri Toplama**: Çok fazla örnek gerekir
2. **Model Seçme**: Hangi algoritma? (karar ağacı, sinir ağı...)
3. **Eğitim**: Modele verileri göster, hataları düzelt
4. **Test**: Hiç görmediği verilerle dene
5. **Tahmin**: Gerçek dünyada kullan!

**Günlük Hayattan ML Örnekleri:**

🎬 **Netflix**: "Senin için" önerileri
📱 **Siri/Google**: Ses tanıma
📷 **Instagram**: Yüz filtreleri
🚗 **Tesla**: Otonom sürüş
💳 **Bankalar**: Dolandırıcılık tespiti
🏥 **Sağlık**: Röntgenden hastalık tespiti

**ML Öğrenmek İçin İlk Adımlar:**

1. **Python Öğren**: ML'in dili
2. **Matematik Temeli**: İstatistik, lineer cebir (temel düzeyde yeterli)
3. **Kütüphaneler**: Scikit-learn, TensorFlow, PyTorch
4. **Proje Yap**: Kaggle'da yarışmalara katıl

**Popüler ML Algoritmaları:**

- **Linear Regression**: Sayısal tahmin (ev fiyatı tahmini)
- **Decision Trees**: Kararlar zinciri (kredi onay sistemi)
- **Neural Networks**: Beyin gibi çalışan katmanlar (görüntü tanıma)
- **Random Forest**: Birçok karar ağacının kombinasyonu

**ML vs. Derin Öğrenme (Deep Learning)?**

- **ML**: Daha genel terim
- **Deep Learning**: ML'in alt dalı, çok katmanlı sinir ağları kullanır (ChatGPT, DALL-E gibi)

**Pratik Tavsiye:**

Başlangıç için Google Colab'da Python + scikit-learn ile basit bir model eğit. Örneğin Iris çiçek veri setiyle başla!

ML artık bir "süper güç" değil, öğrenilebilir bir beceri. Haydi başla! 🚀`,
    quiz: [
      {
        id: 'ms-006-q1',
        question: 'Machine Learning\'in temel prensibi nedir?',
        options: [
          'Her şeyi manuel kodlama',
          'Verilerden otomatik öğrenme',
          'Sadece kurallar yazma',
          'Rastgele tahmin yapma',
        ],
        correctOptionIndex: 1,
        explanation: 'ML, verilerden kalıplar bulup öğrenerek tahminler yapar.',
      },
      {
        id: 'ms-006-q2',
        question: 'Denetimli öğrenme (Supervised Learning) ne demektir?',
        options: [
          'Veriler etiketlidir, model örneklerden öğrenir',
          'Veriler tamamen rastgeledir',
          'Model hiç öğrenmez',
          'Sadece metin verileriyle çalışır',
        ],
        correctOptionIndex: 0,
        explanation: 'Denetimli öğrenmede (Supervised Learning), modele hem girdi hem de doğru çıktı (etiket) verilir. Örneğin spam filtresi için: 10,000 e-posta ve her birinin "spam" ya da "değil" etiketi gösterilir. Model bu örneklerden kalıpları öğrenir ve yeni gelen e-postaları sınıflandırır. Gözetimli dersinizde öğretmenin size sorular ve cevapları birlikte vermesi gibi! Diğer yöntemler: Denetimsiz öğrenme (etiket yok, model kendi kalıpları bulur) ve Pekiştirmeli öğrenme (ödül-ceza sistemi).',
      },
    ],
  },

  // STARTUP (PREMIUM)
  {
    id: 'ms-007',
    title: 'MVP (Minimum Viable Product) Nedir?',
    summary: 'Startup dünyasında hızlı test: En az özellikle piyasaya çık, öğren ve geliştir.',
    category: 'Startup',
    durationMinutes: 5,
    isPremium: true,
    content: `MVP (Minimum Viable Product), startup dünyasının en önemli kavramlarından biri. "Mükemmel ürün" yerine "test edilebilir ürün" felsefesi.

**MVP Nedir?**

Bir ürünün en temel özelliklerle piyasaya sunulmuş, kullanıcılardan geri bildirim almaya yetecek kadar işlevsel versiyonudur.

**Hedef:** Minimum çaba ile maximum öğrenme!

**MVP'nin Altın Kuralları:**

1. **Temel Problemi Çöz**: Tüm özellikleri değil, CORE sorunu çöz
2. **Hızlı Çıkar**: Ay değil, haftalarda piyasaya
3. **Öğren ve Pivot**: Kullanıcılar ne diyor? Ona göre değiş
4. **Kaynakları Koru**: Para, zaman, enerji israfı yapma

**MVP Olmayan Şeyler:**

❌ Beta versiyonu değil (çok daha basit)
❌ Prototip değil (gerçek kullanıcılara açık)
❌ Final ürün değil (sürekli evrim geçirir)

**Ünlü MVP Örnekleri:**

**1. Dropbox (2008)**
- Gerçek ürün yok
- Sadece 3 dakikalık video: "Nasıl çalışacağını" gösterdi
- 75,000 kişi bekleme listesine kaydoldu
- Sonra ürünü geliştirdiler

**2. Airbnb (2007)**
- 3 arkadaş, evlerini kiraladı
- Kendi websitelerinde fotoğraf paylaştılar
- İlk misafirler: 3 kişi
- Şimdi: $100+ milyar değerinde

**3. Zappos (Ayakkabı)**
- Envanter yok!
- Sipariş gelince mağazadan alıp gönderdi
- Önce talep test edildi, sonra stok yapıldı

**MVP Türleri:**

**1. Landing Page MVP**
Sadece web sayfası, e-posta toplayıcı. Ürün yok henüz.
Örnek: "Yakında gelecek!" + e-posta formu

**2. Concierge MVP**
Manuel yapılan hizmet, otomasyon yok.
Örnek: Food delivery app yapmadan, sen sipariş topla ve teslim et.

**3. Wizard of Oz MVP**
Kullanıcı otomasyon sanıyor, arkada sen manuelsin.
Örnek: AI chatbot gibi görünüyor, sen cevap yazıyorsun.

**4. Single-Feature MVP**
Sadece 1 özellik var, ama mükemmel çalışıyor.
Örnek: Instagram başlangıçta sadece fotoğraf filtresi + paylaşımdı.

**MVP Adım Adım:**

**1. Problem Tanımla**
- Hangi acı noktasını çözüyorsun?
- Kime çözüyorsun?

**2. Core Özelliği Belirle**
- En önemli 1-3 özellik ne?
- Bunlar olmadan ürün çalışır mı? → Hayır olanlar CORE

**3. Hızlı Geliştir**
- No-code tools kullan (Bubble, Webflow, Airtable)
- 2-4 hafta hedefle

**4. Gerçek Kullanıcılarla Test Et**
- Arkadaşlar sayılmaz
- Ödeyecek müşterilerle konuş

**5. Ölç ve Öğren**
- Hangi özelliği kullanıyorlar?
- Neyi değiştirmemi istiyorlar?
- Ödemeye razı mılar?

**6. Pivot veya Persevere**
- Pivot: Yön değiştir
- Persevere: Aynı yolda devam, iyileştir

**Yaygın MVP Hataları:**

❌ **"Mükemmel" olana kadar beklemek**
→ Hiç çıkmaz, rakipler geçer

❌ **Çok özellik eklemek**
→ Odak kaybolur, zaman boşa gider

❌ **Gerçek müşterilerden kaçınmak**
→ Arkadaşlar gerçeği söylemez

❌ **Geri bildirimi görmezden gelmek**
→ MVP'nin amacı öğrenmek!

**Pro İpuçları:**

💡 "Eğer ilk versiyonunuzdan utanmıyorsanız, çok geç çıkardınız" - Reid Hoffman (LinkedIn kurucusu)

💡 MVP = Düşük kalite DEĞİL. Temel özellik yüksek kaliteli olmalı, sadece AZ olmalı.

💡 Fiyat da MVP'nin parçası. Erken kullanıcılardan ücret al, değer testi yap.

**Başlangıç Soruları:**

1. Ürünüm olmadan bu sorunu nasıl test edebilirim?
2. Manuel yaparak başlayabilir miyim?
3. En az hangi özellikle değer sunabilirim?

MVP, mükemmellik değil, öğrenme için bir araçtır. Çabuk çık, çabuk öğren! 🚀`,
    quiz: [
      {
        id: 'ms-007-q1',
        question: 'MVP\'nin amacı nedir?',
        options: [
          'Kusursuz bir ürün sunmak',
          'Minimum özelliklerle hızlı test ve öğrenme',
          'Tüm özellikleri eklemek',
          'Pazarlamayı geciktirmek',
        ],
        correctOptionIndex: 1,
      },
      {
        id: 'ms-007-q2',
        question: 'MVP yaklaşımının faydası nedir?',
        options: [
          'Daha fazla zaman harcama',
          'Gerçek kullanıcı geri bildirimi ile hızlı öğrenme',
          'Hiç test etmeme',
          'Pazara en son girme',
        ],
        correctOptionIndex: 1,
        explanation: 'MVP (Minimum Viable Product) yaklaşımının en büyük faydası, gerçek kullanıcılardan hızlı geri bildirim alarak ürününüzü geliştirmenizdir. Aylar harcayıp "mükemmel" bir ürün yapmak yerine, 2-4 haftada temel özelliklerle çıkarsınız. Kullanıcılar ne seviyor? Neyi kullanmıyor? Ne eksik? Bu verilerle ürünü şekillendirirsiniz. Dropbox videoyla, Airbnb 3 kişiyle, Zappos stoksuz başladı. Hepsi MVP ile başarılı oldu. "Build-Measure-Learn" döngüsü startup dünyasının altın kuralıdır.',
      },
    ],
  },

  // YARATICILIK
  {
    id: 'ms-008',
    title: 'Brainstorming Teknikleri',
    summary: 'Fikirlerini patlatmak için etkili beyin fırtınası yöntemlerini öğren.',
    category: 'Yaratıcılık',
    durationMinutes: 5,
    isPremium: false,
    content: 'Brainstorming, yaratıcı fikir üretmek için kullanılan grup çalışmasıdır. Eleştirmeden, serbest düşünmeyi teşvik ederek, miktara odaklanarak yapılır.',
    quiz: [
      {
        id: 'ms-008-q1',
        question: 'Brainstorming\'in altın kuralı nedir?',
        options: [
          'Hemen eleştiri yap',
          'Başlangıçta tüm fikirleri kabul et, eleştirme',
          'Sadece bir kişi konuşsun',
          'Fikirler az olsun',
        ],
        correctOptionIndex: 1,
        explanation: 'Brainstorming\'in en önemli kuralı: Başlangıçta HİÇBİR fikri eleştirme! Tüm fikirleri kabul et, "kötü fikir yok" mantığıyla çalış. Neden? Çünkü eleştiri yaratıcılığı öldürür. İnsanlar yargılanma korkusuyla çılgın fikirlerini söylemekten çekinir. Oysa en inovatif çözümler genelde "saçma" görünen fikirlerden doğar. Post-it Note, tesadüfen yapışmayan bir yapıştırıcının "başarısızlığından" çıktı. İyi brainstorming: önce tüm fikirleri topla (divergent thinking), sonra değerlendir (convergent thinking). Ayrıştır: Yaratma ve yargılama süreçlerini!',
      },
      {
        id: 'ms-008-q2',
        question: 'Brainstorming\'de öncelik nedir?',
        options: [
          'Kaliteden çok miktar (çok fikir üretmek)',
          'Sadece mükemmel fikirler',
          'Sessizlik',
          'Tek bir kişinin fikirleri',
        ],
        correctOptionIndex: 0,
        explanation: 'Brainstorming\'in temel prensibi "miktar kaliteyi getirir"dir. Başlangıçta mümkün olduğunca çok fikir üretmeye odaklanırsınız, kaliteyi daha sonra değerlendirirsiniz. Neden? Çünkü beyin baskı altında daha yaratıcı çalışır ve "kötü" bir fikir başka bir harika fikre ilham verebilir. Eleştiri yapmadan, özgürce düşünmek yaratıcılığı tetikler. İyi bir brainstorming seansında 50-100 fikir normal karşılanır. Sonra filtreleme yaparsınız: hangileri uygulanabilir, hangisi en etkili? İlk aşamada yargılamak yaratıcılığın en büyük düşmanıdır.',
      },
    ],
  },

  // STARTUP (PREMIUM)
  {
    id: 'ms-009',
    title: 'Lean Startup Metodolojisi',
    summary: 'Hızlı dene, öğren, pivot yap. Startup başarısı için agile yaklaşım.',
    category: 'Startup',
    durationMinutes: 5,
    isPremium: true,
    content: 'Lean Startup, Eric Ries tarafından geliştirilen, ürün geliştirmede hızlı deneme-öğrenme döngüsüne odaklanan metodolojdir. Build-Measure-Learn döngüsü kullanılır.',
    quiz: [
      {
        id: 'ms-009-q1',
        question: 'Lean Startup\'ın temel döngüsü nedir?',
        options: [
          'Plan-Execute-Finish',
          'Build-Measure-Learn',
          'Think-Wait-Launch',
          'Design-Code-Sell',
        ],
        correctOptionIndex: 1,
        explanation: 'Build (üret), Measure (ölç), Learn (öğren) döngüsü ile sürekli iyileştirme yapılır.',
      },
      {
        id: 'ms-009-q2',
        question: '"Pivot" ne demektir?',
        options: [
          'Pes etmek',
          'Stratejide önemli değişiklik yapmak',
          'Aynı şeyi tekrarlamak',
          'Hiçbir şey değiştirmemek',
        ],
        correctOptionIndex: 1,
        explanation: 'Pivot, startup dünyasında kullanılan bir terimdir ve strateji veya ürün yönünde önemli bir değişiklik yapmak anlamına gelir. Bu, pes etmek değil, öğrendiklerinize dayanarak akıllıca yön değiştirmektir. Ünlü örnekler: Instagram fotoğraf paylaşım özelliğine pivotlamadan önce bir check-in uygulamasıydı. Twitter podcast platformuydu. YouTube bir video randevu sitesiydi. Pivot yapmak başarısızlık değil, müşteri geri bildirimlerini dinlemek ve adapte olmaktır. "Build-Measure-Learn" döngüsünün sonunda pivot ya da persevere (devam et) kararı verilir.',
      },
    ],
  },

  // YAPAY ZEKA (PREMIUM)
  {
    id: 'ms-010',
    title: 'Prompt Engineering Temelleri',
    summary: 'AI ile etkili iletişim: Daha iyi sonuçlar için prompt yazma sanatı.',
    category: 'Yapay Zeka',
    durationMinutes: 5,
    isPremium: true,
    content: 'Prompt Engineering, yapay zeka modellerinden istediğiniz sonucu almak için etkili talimatlar yazma becerisidir. Net, spesifik ve bağlamsal promptlar yazın.',
    quiz: [
      {
        id: 'ms-010-q1',
        question: 'İyi bir prompt\'un özelliği nedir?',
        options: [
          'Belirsiz ve genel',
          'Net, spesifik ve bağlam içerir',
          'Çok kısa ve eksik',
          'Karmaşık ve anlaşılmaz',
        ],
        correctOptionIndex: 1,
        explanation: 'İyi bir prompt net, spesifik ve bağlam içerir. Kötü prompt: "Makale yaz". İyi prompt: "Yapay zeka etiği hakkında 500 kelimelik, ileri seviye teknoloji okuyucuları için, avantaj ve dezavantajları dengeli şekilde ele alan bir makale yaz. Her paragrafa bir alt başlık ekle." Gördün mü farkı? İyi prompt: Kime (teknoloji okuyucuları), ne (makale), kaç (500 kelime), nasıl (dengeli), format (alt başlıklar) bilgisini içeriyor. AI\'dan en iyi sonucu almak için CLEAR (Clear, Lengthy, Examples, Audience, Role) formülünü kullan.',
      },
      {
        id: 'ms-010-q2',
        question: 'Prompt engineering neden önemlidir?',
        options: [
          'AI\'dan daha kaliteli ve hedefli sonuçlar almak için',
          'Gereksiz tekrar yapmak için',
          'Hiçbir fayda sağlamaz',
          'Sadece eğlence için',
        ],
        correctOptionIndex: 0,
        explanation: 'Prompt engineering, yapay zeka modellerinden (ChatGPT, Claude, vb.) istediğiniz sonucu alma sanatıdır. Kötü prompt: "Kod yaz". İyi prompt: "Python\'da kullanıcı girişi alan, şifre doğrulayan (min 8 karakter, 1 büyük harf, 1 rakam) ve hata mesajları gösteren bir fonksiyon yaz. Açıklamalı olsun." Fark görüyor musun? İyi bir prompt: net, spesifik, bağlam içerir ve format belirtir. Prompt engineering\'de ustalaşmak, AI\'yı bir araç yerine bir uzman asistan gibi kullanmanızı sağlar. GPT-4 gibi modellerde doğru prompt 10x daha iyi sonuç verir.',
      },
    ],
  },

  // TEKNOLOJİ
  {
    id: 'ms-011',
    title: 'API Nedir ve Nasıl Çalışır?',
    summary: 'Uygulamaların konuşma dili: API\'ların temel mantığını öğren.',
    category: 'Teknoloji',
    durationMinutes: 5,
    isPremium: false,
    content: `API (Application Programming Interface) - yazılım dünyasının "evrensel dili"! Farklı uygulamaların birbirleriyle konuşmasını sağlayan köprüdür.

**API Nedir? Basit Açıklama:**
Restoranda garson gibi düşün. Sen (müşteri) mutfağa (sunucu) doğrudan giremezsin. Garson (API) siparişini mutfağa iletir, yemeği getirir. API da aynı şekilde çalışır!

**Temel Kavramlar:**

1. **Endpoint (Uç Nokta)**: API'nin adresi
   - Örnek: \`https://api.weather.com/current\`
   - Bu adrese istek gönderirsin, hava durumu verisi alırsın

2. **HTTP Metodları**: Ne yapmak istediğini söyler
   - **GET**: Veri al (örnek: kullanıcı bilgilerini çek)
   - **POST**: Yeni veri oluştur (örnek: yeni kullanıcı kaydet)
   - **PUT**: Mevcut veriyi güncelle
   - **DELETE**: Veriyi sil

3. **Request/Response**: İstek/Cevap döngüsü
   - Sen: "Bu kullanıcının bilgilerini ver" (Request)
   - API: "İşte kullanıcı bilgileri" (Response)

**Gerçek Hayat Örnekleri:**

📱 **Instagram**: Fotoğraf paylaşırken
- Senin uygulaman → Instagram API'ye fotoğraf gönderir
- API → Fotoğrafı işler, veritabanına kaydeder
- API → "Başarılı!" mesajı döner

🌤️ **Hava Durumu Uygulaması**:
- Uygulaman → Weather API'ye şehir adı gönderir
- API → Hava durumu verilerini döner
- Uygulaman → Güzel bir grafikle gösterir

**API Türleri:**

1. **REST API**: En yaygın tür
   - URL tabanlı (web adresi gibi)
   - JSON formatında veri alışverişi
   - Örnek: \`GET /users/123\` → 123 numaralı kullanıcıyı getir

2. **GraphQL**: Daha esnek
   - Sadece istediğin veriyi al
   - Tek istekle birden fazla veri çekebilirsin

**Pratik Örnek - Twitter API:**
\`\`\`javascript
// Tweet gönderme
POST https://api.twitter.com/2/tweets
{
  "text": "Merhaba dünya!"
}

// Sonuç
{
  "data": {
    "id": "123456789",
    "text": "Merhaba dünya!"
  }
}
\`\`\`

**API Güvenliği:**
🔐 **API Key**: Şifre gibi - kim olduğunu kanıtlar
🔐 **Rate Limiting**: Çok fazla istek gönderirsen engeller
🔐 **Authentication**: Giriş yapmış kullanıcılar için

**Geliştiriciler İçin:**
- **Postman**: API'leri test etmek için
- **Swagger**: API dokümantasyonu
- **JSON**: Veri formatı (JavaScript Object Notation)

**5 Dakikada Öğrendiklerin:**
✅ API = Uygulamalar arası köprü
✅ GET/POST/PUT/DELETE metodları
✅ Request/Response döngüsü
✅ REST ve GraphQL farkları
✅ Gerçek hayat örnekleri

Artık her uygulama gördüğünde "Bu nasıl çalışıyor?" diye merak ettiğinde, API'lerin arkasında olduğunu bileceksin! 🚀`,
    quiz: [
      {
        id: 'ms-011-q1',
        question: 'API\'ın temel amacı nedir?',
        options: [
          'Veritabanı oluşturmak',
          'Farklı yazılımlar arası iletişimi sağlamak',
          'Sadece frontend geliştirmek',
          'Tasarım yapmak',
        ],
        correctOptionIndex: 1,
        explanation: 'API (Application Programming Interface), farklı yazılımların birbirleriyle konuşmasını sağlayan arayüzdür. Restoran örneği: Sen (uygulama) → Garson (API) → Mutfak (sunucu). Garson siparişini mutfağa iletir, yemeği getirir. API de aynı mantık! Örnek: Hava durumu uygulaması, OpenWeather API\'sine istek gönderir, hava verilerini alır. Google Maps\'i kendi uygulamanda kullanıyorsan, Google Maps API\'sini kullanıyorsun. API\'lar sayesinde her şeyi sıfırdan yapmana gerek yok, başkalarının hizmetlerini entegre edebilirsin. Modern web tamamen API\'larla çalışır!',
      },
      {
        id: 'ms-011-q2',
        question: 'REST API\'da veri almak için hangi HTTP metodu kullanılır?',
        options: [
          'POST',
          'DELETE',
          'GET',
          'UPDATE',
        ],
        correctOptionIndex: 2,
        explanation: 'REST API\'larda HTTP metodları farklı işlemler için kullanılır. GET metodu veri almak (okumak) içindir. Örnek: GET /users/123 → 123 numaralı kullanıcının bilgilerini getir. Diğer metodlar: POST (yeni veri oluştur), PUT (mevcut veriyi güncelle), DELETE (veri sil). GET istekleri "güvenli"dir, yani sunucuda bir değişiklik yapmaz, sadece okur. Tarayıcınızda bir web sitesi açtığınızda, aslında o sayfayı GET isteğiyle alıyorsunuz. REST API\'larda bu metodları doğru kullanmak, kodunuzu anlaşılır ve standartlara uygun yapar.',
      },
    ],
  },

  // İŞ & KARİYER
  {
    id: 'ms-012',
    title: 'Etkili E-posta Yazma',
    summary: 'Profesyonel ve etkili e-postalarla iletişimini güçlendir.',
    category: 'İş & Kariyer',
    durationMinutes: 5,
    isPremium: false,
    content: 'İş dünyasında e-posta yazımı önemli bir beceridir. Kısa, öz, net konu başlığı, profesyonel üslup ve açık eylem adımları içermelidir.',
    quiz: [
      {
        id: 'ms-012-q1',
        question: 'İş e-postasında konu satırı nasıl olmalıdır?',
        options: [
          'Uzun ve detaylı',
          'Kısa, net ve konuyu özetleyen',
          'Boş bırakılabilir',
          'Emoji ile dolu',
        ],
        correctOptionIndex: 1,
        explanation: 'İş e-postasında konu satırı çok önemlidir çünkü alıcı önce onu görür ve e-postayı açıp açmamaya karar verir. İyi konu satırı: kısa (50 karakter altı), net ve konuyu özetler. Kötü örnek: "Merhaba" veya "Toplantı". İyi örnek: "25 Mart Pazartesi Pazarlama Toplantısı - Katılım Talebi" ya da "Q1 Raporu - Onay Bekleniyor". Acil ise "[ACİL]" ekleyebilirsin ama her e-postada kullanma, etkisini kaybeder. Konu satırı, e-postanın özeti gibidir: onu okuyan kişi ne beklediğini anlamalı.',
      },
      {
        id: 'ms-012-q2',
        question: 'Profesyonel e-postada en önemli kural nedir?',
        options: [
          'Samimi bir dil kullanmak',
          'Hemen cevap vermek zorunda değilsiniz',
          'Açık, kısa ve amaca uygun yazmak',
          'Çok sayıda kişiye CC eklemek',
        ],
        correctOptionIndex: 2,
        explanation: 'Profesyonel e-posta yazımında en önemli kural: açık, kısa ve amaca uygun yazmaktır. İş dünyasında herkes yoğundur, uzun ve dağınık e-postalar okunmaz. İyi bir iş e-postası: Net konu satırı ("Pazartesi Toplantısı İçin Ajanda"), hızlı giriş, ana mesaj (3-5 cümle), açık aksiyon adımı ("Lütfen Cuma\'ya kadar onaylayın"). Gereksiz CC\'ler spam yaratır. Samimi dil duruma göre değişir ama profesyonellik şarttır. E-posta gönder tuşuna basmadan önce sor: "Karşı taraf ne yapmalı?" Bu sorunun cevabı net olmalı.',
      },
    ],
  },
];


