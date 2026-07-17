import React, { useState, useRef, useEffect } from "react";
import logoSrc from "@/imports/Logo_1.jpg";
import styles from "./App.module.scss";
import {
  FileText, ScrollText, Wrench, BarChart2, Star, Wallet, ShoppingCart,
  ExternalLink, Bell, Search, ChevronRight, TrendingUp, TrendingDown,
  Package, Send, User, Menu, X, Link2, QrCode, Gift, ArrowRightLeft,
  BookOpen, HelpCircle, FolderOpen, Award, Database, ClipboardList,
  FileCheck, MessageCircle, Phone, Mail, MapPin, MessageSquare,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from "recharts";

// ─────────────────────────────────────────────────────────────────
// NAV STRUCTURE
// ─────────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    id: "main", label: "Основное",
    items: [
      { id: "applications",  label: "Заявки",   icon: FileText },
      { id: "cart",          label: "Корзина",  icon: ShoppingCart },
      { id: "cashback",      label: "Кэшбек",   icon: Wallet },
    ],
  },
  {
    id: "contracts", label: "Договора",
    items: [
      { id: "contract-dealer",      label: "Дилерский договор",      icon: ScrollText },
      { id: "contract-addendum",    label: "Доп. соглашения",        icon: FileText },
      { id: "contract-transfer",    label: "Акты приёма-передачи",   icon: ClipboardList },
      { id: "contract-reconcile",   label: "Акты сверок",            icon: FileCheck },
    ],
  },
  {
    id: "analytics", label: "Аналитика",
    items: [
      { id: "analytics-sales-tech",  label: "Продажи — Техника",      icon: BarChart2 },
      { id: "analytics-sales-parts", label: "Продажи — Запчасти",     icon: BarChart2 },
      { id: "analytics-marketing",   label: "Аналитика маркетинга",   icon: TrendingUp },
      { id: "analytics-service",     label: "Аналитика ТО",           icon: Wrench },
    ],
  },
  {
    id: "service-group", label: "Сервис",
    items: [
      { id: "service", label: "Сервис, гарантия и ремонт", icon: Wrench },
    ],
  },
  {
    id: "catalog", label: "База данных товаров",
    items: [
      { id: "catalog-tech",  label: "Техника (цены и сток)",   icon: Database },
      { id: "catalog-parts", label: "Запчасти (цены и сток)",  icon: Database },
    ],
  },
  {
    id: "ambassador", label: "Проект Амбассадор",
    items: [
      { id: "recommendations", label: "Рекомендации",             icon: Star },
      { id: "agent-reward",    label: "Агентское вознаграждение", icon: Award },
    ],
  },
  {
    id: "learning", label: "Обучение и материалы",
    items: [
      { id: "learning-main",     label: "Обучение",                  icon: BookOpen },
      { id: "marketing-mats",    label: "Маркетинговые материалы",   icon: FolderOpen },
      { id: "faq",               label: "FAQ",                       icon: HelpCircle },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const analyticsData = [
  { month: "Янв", value: 42 },
  { month: "Фев", value: 58 },
  { month: "Мар", value: 51 },
  { month: "Апр", value: 73 },
  { month: "Май", value: 89 },
  { month: "Июн", value: 76 },
  { month: "Июл", value: 94 },
];

const cashbackData = [
  { month: "Апр", earned: 1240, spent: 800 },
  { month: "Май", earned: 1850, spent: 1200 },
  { month: "Июн", earned: 2100, spent: 900 },
  { month: "Июл", earned: 1680, spent: 1400 },
];

const applications = [
  { id: "ЗА-2847", title: "Поставка оборудования Siemens",    date: "14.07.2026", status: "pending",  amount: "₽ 284 000" },
  { id: "ЗА-2846", title: "Техническое обслуживание ЦОД",     date: "13.07.2026", status: "approved", amount: "₽ 67 500" },
  { id: "ЗА-2845", title: "Закупка комплектующих Q3",          date: "11.07.2026", status: "approved", amount: "₽ 1 200 000" },
  { id: "ЗА-2844", title: "Монтаж системы вентиляции",         date: "09.07.2026", status: "rejected", amount: "₽ 450 000" },
  { id: "ЗА-2843", title: "Обновление серверного парка",       date: "07.07.2026", status: "pending",  amount: "₽ 3 780 000" },
];

const contracts = [
  { id: "ДГ-1024", title: "Договор поставки №1024",   partner: "ООО «ТехноСтрой»",  date: "01.08.2026", status: "active" },
  { id: "ДГ-1023", title: "Сервисный контракт №1023", partner: "АО «СервисГрупп»",  date: "15.09.2026", status: "active" },
  { id: "ДГ-1020", title: "Рамочный договор №1020",   partner: "ИП Миронов С.В.",   date: "30.06.2026", status: "expiring" },
  { id: "ДГ-1018", title: "Договор аренды №1018",     partner: "ООО «Логистик»",    date: "01.01.2026", status: "expired" },
];

const serviceItems = [
  { id: "СВ-441", device: "Принтер Kyocera ECOSYS",      issue: "Замена картриджа и чистка",     date: "10.07.2026", status: "inProgress" },
  { id: "СВ-440", device: "Кондиционер Daikin FTXB35C",  issue: "Гарантийный ремонт: фреон",     date: "08.07.2026", status: "completed" },
  { id: "СВ-438", device: "ИБП APC Smart-UPS 2200",      issue: "Замена аккумуляторов",          date: "05.07.2026", status: "completed" },
  { id: "СВ-437", device: "Сервер Dell PowerEdge R750",  issue: "Диагностика блока питания",     date: "16.07.2026", status: "scheduled" },
];

const recommendations = [
  {
    title: "Облачное резервное копирование",
    desc: "Расширьте хранилище до 10 ТБ на основе ваших текущих договоров.",
    bonus: "+ 3 200 ₽ кэшбека", tag: "ambassador",
  },
  {
    title: "Корпоративная лицензия MS Office",
    desc: "Корпоративный пакет сэкономит 34% по сравнению с текущими лицензиями.",
    bonus: "+ 8 500 ₽ кэшбека", tag: "ambassador",
  },
  {
    title: "Продление сервисного контракта",
    desc: "ДГ-1020 истекает через 14 дней. Продлите сейчас по текущей ставке.",
    bonus: "+ 1 800 ₽ кэшбека", tag: "urgent",
  },
];

const cartItems = [
  { name: "Маршрутизатор Cisco ISR 4321",       sku: "ISR4321/K9",       qty: 2, price: 128_500 },
  { name: "Коммутатор Cisco Catalyst 9200L",    sku: "C9200L-24P-4G",    qty: 4, price: 87_300 },
  { name: "Сервисный пакет Gold, 12 мес",       sku: "SVC-GOLD-12",      qty: 1, price: 45_000 },
];

// ─────────────────────────────────────────────────────────────────
// SHARED UI PRIMITIVES
// ─────────────────────────────────────────────────────────────────

type BadgeKey =
  | "pending" | "approved" | "rejected" | "active" | "expiring"
  | "expired" | "inProgress" | "completed" | "scheduled";

const BADGE_LABELS: Record<BadgeKey, string> = {
  pending:    "На рассмотрении",
  approved:   "Одобрено",
  rejected:   "Отклонено",
  active:     "Активен",
  expiring:   "Истекает",
  expired:    "Истёк",
  inProgress: "В работе",
  completed:  "Завершено",
  scheduled:  "Запланировано",
};

function Badge({ status }: { status: string }) {
  const key = status as BadgeKey;
  return (
    <span className={`${styles.badge} ${styles[key] || ""}`}>
      {BADGE_LABELS[key] ?? status}
    </span>
  );
}

function StatCard({ label, value, sub, up }: { label: string; value: string; sub: string; up?: boolean }) {
  return (
    <div className={styles.statCard}>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
      <span className={`${styles.statSub} ${up === true ? styles.up : up === false ? styles.down : ""}`}>
        {up !== undefined && (up ? <TrendingUp size={12} /> : <TrendingDown size={12} />)}
        {sub}
      </span>
    </div>
  );
}

function PlaceholderSection({ title, desc, action }: { title: string; desc: string; action: string }) {
  return (
    <div className={styles.placeholderBox}>
      <FolderOpen size={48} />
      <h3>{title}</h3>
      <p>{desc}</p>
      <button>{action}</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION CONTENT COMPONENTS
// ─────────────────────────────────────────────────────────────────

function SectionApplications() {
  return (
    <>
      <div className={styles.statsGrid}>
        <StatCard label="Всего заявок" value="47" sub="за июль" />
        <StatCard label="Одобрено" value="31" sub="+12% к прошлому" up={true} />
        <StatCard label="На рассмотрении" value="9" sub="ожидают ответа" />
        <StatCard label="Отклонено" value="7" sub="-3% к прошлому" up={false} />
      </div>
      <div className={styles.tableCard}>
        <div className={styles.tableHead}>
          <h3>Последние заявки</h3>
          <button className={styles.tableHeadBtn}>Все заявки →</button>
        </div>
        {applications.map(a => (
          <div key={a.id} className={styles.tableRow}>
            <span className={styles.tableId}>{a.id}</span>
            <div className={styles.tableMain}><span className={styles.tableName}>{a.title}</span></div>
            <span className={styles.tableDate}>{a.date}</span>
            <span className={styles.tableAmount}>{a.amount}</span>
            <Badge status={a.status} />
          </div>
        ))}
      </div>
    </>
  );
}

function SectionContracts() {
  return (
    <>
      <div className={`${styles.statsGrid}`} style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <StatCard label="Активных договоров" value="18" sub="на сегодня" />
        <StatCard label="Истекают в 30 дней" value="3" sub="требуют внимания" />
        <StatCard label="Сумма контрактов" value="₽ 24.7 млн" sub="+8% квартал" up={true} />
      </div>
      <div className={styles.tableCard}>
        <div className={styles.tableHead}>
          <h3>Договора</h3>
          <button className={styles.tableHeadBtn}>Все →</button>
        </div>
        {contracts.map(c => (
          <div key={c.id} className={styles.tableRow}>
            <span className={styles.tableId}>{c.id}</span>
            <div className={styles.tableMain}>
              <span className={styles.tableName}>{c.title}</span>
              <span className={styles.tableSub}>{c.partner}</span>
            </div>
            <span className={styles.tableDate}>до {c.date}</span>
            <Badge status={c.status} />
          </div>
        ))}
      </div>
    </>
  );
}

function SectionService() {
  return (
    <>
      <div className={styles.statsGrid} style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <StatCard label="Открытых обращений" value="4" sub="в работе" />
        <StatCard label="Закрыто за месяц" value="21" sub="среднее время 1.8 дн." up={true} />
        <StatCard label="Гарантийных случаев" value="3" sub="текущий квартал" />
      </div>
      <div className={styles.tableCard}>
        <div className={styles.tableHead}>
          <h3>Обращения в сервис</h3>
          <button className={styles.tableHeadPrimary}>+ Новое обращение</button>
        </div>
        {serviceItems.map(s => (
          <div key={s.id} className={styles.tableRow}>
            <span className={styles.tableId}>{s.id}</span>
            <div className={styles.tableMain}>
              <span className={styles.tableName}>{s.device}</span>
              <span className={styles.tableSub}>{s.issue}</span>
            </div>
            <span className={styles.tableDate}>{s.date}</span>
            <Badge status={s.status} />
          </div>
        ))}
      </div>
    </>
  );
}

function SectionAnalytics({ title }: { title: string }) {
  return (
    <>
      <div className={styles.statsGrid}>
        <StatCard label="Выручка (июль)" value="₽ 4.2 млн" sub="+18% к прошлому" up={true} />
        <StatCard label="Средний чек" value="₽ 89 400" sub="+5%" up={true} />
        <StatCard label="Новых клиентов" value="14" sub="-2 к прошлому" up={false} />
        <StatCard label="NPS" value="74" sub="отличный показатель" up={true} />
      </div>
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3>{title} — заявки по месяцам</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={analyticsData} barSize={26}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "rgba(255,214,0,0.12)" }} />
              <Bar dataKey="value" fill="#FFD600" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.chartCard}>
          <h3>Динамика выручки</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={analyticsData}>
              <CartesianGrid stroke="rgba(0,0,0,0.06)" strokeDasharray="4 4" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="value" stroke="#FFD600" strokeWidth={2.5} dot={{ fill: "#FFD600", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

function SectionRecommendations() {
  return (
    <>
      <div className={styles.ambassadorBanner}>
        <div className={styles.ambassadorIcon}><Star size={18} /></div>
        <div className={styles.ambassadorText}>
          <h3>Проект Амбассадор</h3>
          <p>Рекомендуйте продукты и услуги — получайте кэшбек с каждой успешной заявки. Ваш уровень: <strong>Серебряный амбассадор</strong> · 2 340 бонусных баллов</p>
        </div>
      </div>
      <div className={styles.recsGrid}>
        {recommendations.map((r, i) => (
          <div key={i} className={styles.recCard}>
            <div className={styles.recTags}>
              <span className={`${styles.badge} ${r.tag === "urgent" ? styles.urgent : styles.ambassador}`}>
                {r.tag === "urgent" ? "Срочно" : "Амбассадор"}
              </span>
              <span className={`${styles.badge} ${styles.approved}`}>{r.bonus}</span>
            </div>
            <p className={styles.recTitle}>{r.title}</p>
            <p className={styles.recDesc}>{r.desc}</p>
            <button className={styles.recBtn}>Рекомендовать</button>
          </div>
        ))}
      </div>
    </>
  );
}

function SectionCashback() {
  return (
    <>
      <div className={styles.statsGrid}>
        <StatCard label="Баланс кэшбека" value="₽ 18 240" sub="доступно к списанию" />
        <StatCard label="Начислено за июль" value="₽ 4 680" sub="+22% к прошлому" up={true} />
        <StatCard label="Списано за июль" value="₽ 1 400" sub="на оплату заявок" />
        <StatCard label="Уровень" value="Серебро" sub="до Золота: 12 400 ₽" />
      </div>
      <div className={styles.chartCard} style={{ marginBottom: 16 }}>
        <h3>Кэшбек за 4 месяца</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={cashbackData} barSize={26} barGap={4}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#717182" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8, fontSize: 12 }} cursor={{ fill: "rgba(255,214,0,0.08)" }} />
            <Bar dataKey="earned" name="Начислено" fill="#FFD600" radius={[4, 4, 0, 0]} />
            <Bar dataKey="spent"  name="Списано"   fill="#e0e0e0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.cashbackApply}>
        <div className={styles.cashbackApplyText}>
          <p>Списать кэшбек</p>
          <span>Применить баланс к текущей заявке или договору</span>
        </div>
        <button className={styles.cashbackApplyBtn}>Применить кэшбек</button>
      </div>
    </>
  );
}

function SectionCart() {
  const [qtys, setQtys] = useState<Record<string, number>>(
    Object.fromEntries(cartItems.map(i => [i.sku, i.qty]))
  );
  const total = cartItems.reduce((s, i) => s + i.price * (qtys[i.sku] ?? i.qty), 0);
  return (
    <>
      <div className={styles.tableCard}>
        <div className={styles.tableHead}>
          <h3>Корзина · {cartItems.length} товара</h3>
        </div>
        {cartItems.map(item => (
          <div key={item.sku} className={styles.tableRow}>
            <div className={styles.tableMain}>
              <span className={styles.tableName}>{item.name}</span>
              <span className={styles.tableSub} style={{ fontFamily: "monospace" }}>{item.sku}</span>
            </div>
            <div className={styles.qtyCtrl}>
              <button onClick={() => setQtys(q => ({ ...q, [item.sku]: Math.max(1, (q[item.sku] ?? 1) - 1) }))}>−</button>
              <span>{qtys[item.sku]}</span>
              <button onClick={() => setQtys(q => ({ ...q, [item.sku]: (q[item.sku] ?? 1) + 1 }))}>+</button>
            </div>
            <span className={styles.tableAmount}>₽ {(item.price * (qtys[item.sku] ?? item.qty)).toLocaleString("ru-RU")}</span>
          </div>
        ))}
        <div className={styles.cartFooter}>
          <span>Итого</span>
          <strong>₽ {total.toLocaleString("ru-RU")}</strong>
        </div>
      </div>
      <div className={styles.cartActions}>
        <button className={styles.cartPrimary}>Оформить заявку</button>
        <button className={styles.cartSecondary}>Сохранить список</button>
      </div>
    </>
  );
}

function SectionAgentReward() {
  return (
    <>
      <div className={styles.statsGrid} style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <StatCard label="Начислено (июль)" value="₽ 14 800" sub="+30% к прошлому" up={true} />
        <StatCard label="К выплате" value="₽ 8 200" sub="ближайшая выплата 25.07" />
        <StatCard label="Уровень" value="Серебро" sub="до Золота: 25 сделок" />
      </div>
      <PlaceholderSection
        title="История вознаграждений"
        desc="Здесь отображается история всех начисленных агентских вознаграждений по переданным заявкам."
        action="Выгрузить отчёт"
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION ROUTER
// ─────────────────────────────────────────────────────────────────

function SectionContent({ id }: { id: string }) {
  switch (id) {
    case "applications":          return <SectionApplications />;
    case "cart":                  return <SectionCart />;
    case "cashback":              return <SectionCashback />;
    case "service":               return <SectionService />;
    case "recommendations":       return <SectionRecommendations />;
    case "agent-reward":          return <SectionAgentReward />;

    case "contract-dealer":
    case "contract-addendum":
    case "contract-transfer":
    case "contract-reconcile":    return <SectionContracts />;

    case "analytics-sales-tech":  return <SectionAnalytics title="Техника" />;
    case "analytics-sales-parts": return <SectionAnalytics title="Запчасти" />;
    case "analytics-marketing":   return <SectionAnalytics title="Маркетинг" />;
    case "analytics-service":     return <SectionAnalytics title="ТО" />;

    case "catalog-tech":
      return <PlaceholderSection title="База данных — Техника" desc="Карточки товаров с актуальными ценами и остатками по технике." action="Загрузить каталог" />;
    case "catalog-parts":
      return <PlaceholderSection title="База данных — Запчасти" desc="Карточки товаров с актуальными ценами и остатками по запчастям." action="Загрузить каталог" />;
    case "learning-main":
      return <PlaceholderSection title="Обучение" desc="Обучающие материалы, видеокурсы и тесты для сертификации партнёров." action="Начать обучение" />;
    case "marketing-mats":
      return <PlaceholderSection title="Маркетинговые материалы" desc="Брошюры, баннеры, презентации и шаблоны для продвижения." action="Открыть библиотеку" />;
    case "faq":
      return <PlaceholderSection title="FAQ" desc="Ответы на часто задаваемые вопросы по работе с порталом и продуктами." action="Открыть FAQ" />;

    default:
      return <PlaceholderSection title="Раздел в разработке" desc="Этот раздел скоро будет доступен." action="На главную" />;
  }
}

// ─────────────────────────────────────────────────────────────────
// CHAT WIDGET
// ─────────────────────────────────────────────────────────────────

const INIT_MESSAGES = [
  { from: "manager", text: "Здравствуйте! Я ваш персональный менеджер Анна. Чем могу помочь?", time: "09:01" },
  { from: "manager", text: "Вы можете задать вопрос по заявкам, договорам или сервисному обслуживанию.", time: "09:01" },
];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [draft, setDraft] = useState("");
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open, messages]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,"0")}:${now.getMinutes().toString().padStart(2,"0")}`;
    setMessages(m => [
      ...m,
      { from: "user", text, time },
      { from: "manager", text: "Спасибо за ваш вопрос! Я свяжусь с вами в течение нескольких минут.", time },
    ]);
    setDraft("");
  };

  return (
    <>
      {open && (
        <div className={styles.chatPanel}>
          <div className={styles.chatPanelHeader}>
            <div className={styles.chatAvatar}>А</div>
            <div className={styles.chatHeaderInfo}>
              <strong>Анна — менеджер</strong>
              <span>● онлайн</span>
            </div>
            <button className={styles.chatCloseBtn} onClick={() => setOpen(false)}><X size={16} /></button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.chatMsg} ${m.from === "manager" ? styles.manager : styles.user}`}>
                <div className={styles.chatBubble}>{m.text}</div>
                <span className={`${styles.chatTime} ${m.from === "user" ? styles.right : ""}`}>{m.time}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className={styles.chatInputRow}>
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Напишите сообщение..."
            />
            <button onClick={send}><Send size={15} /></button>
          </div>
        </div>
      )}
      <button className={styles.chatTrigger} onClick={() => setOpen(o => !o)}>
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && unread > 0 && <span className={styles.chatUnread}>{unread}</span>}
      </button>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// NAV SIDEBAR  (collapsible groups)
// ─────────────────────────────────────────────────────────────────

function NavSidebar({
  active, setActive, open, onClose,
}: {
  active: string; setActive: (id: string) => void; open: boolean; onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(
    Object.fromEntries(NAV_GROUPS.map(g => [g.id, true]))
  );

  const toggle = (id: string) => setExpanded(e => ({ ...e, [id]: !e[id] }));

  return (
    <>
      {open && <div className={styles.sidebarOverlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <img src={logoSrc} alt="CAYRUS КАУРУС" />
          <button className={styles.closeBtn} onClick={onClose}><X size={16} /></button>
        </div>

        {/* Nav */}
        <div className={styles.navScroll}>
          {NAV_GROUPS.map(group => (
            <div key={group.id} className={styles.navGroup}>
              <button className={styles.navGroupBtn} onClick={() => toggle(group.id)}>
                <span>{group.label}</span>
                <ChevronRight
                  size={13}
                  className={`${styles.navGroupChevron} ${expanded[group.id] ? styles.rotated : ""}`}
                />
              </button>
              {expanded[group.id] && (
                <div className={styles.subNav}>
                  {group.items.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      className={`${styles.navItem} ${active === id ? styles.active : ""}`}
                      onClick={() => { setActive(id); onClose(); }}
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                      {active === id && <ChevronRight size={12} className={styles.navItemArrow} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Telegram CTA + user */}
        <div className={styles.sidebarBottom}>
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tgBtn}
          >
            <Send size={15} />
            <div className={styles.tgBtnText}>
              <span>Личный кабинет</span>
              <span className={styles.tgBtnSub}>Telegram / MAX</span>
            </div>
            <ExternalLink size={12} />
          </a>
          <div className={styles.userRow}>
            <div className={styles.userAvatar}><User size={15} /></div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Алексей Петров</span>
              <span className={styles.userEmail}>a.petrov@corp.ru</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// SECTION LABEL LOOKUP
// ─────────────────────────────────────────────────────────────────

function getLabel(id: string): string {
  for (const g of NAV_GROUPS) {
    const item = g.items.find(i => i.id === id);
    if (item) return item.label;
  }
  return "Дашборд";
}

// ─────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("applications");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <NavSidebar
        active={active}
        setActive={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={styles.main}>
        {/* ── Header (black) ── */}
        <header className={styles.header}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className={styles.headerSearch}>
            <Search size={14} />
            <input placeholder="Поиск..." />
          </div>
          <div className={styles.headerRight}>
            <button className={styles.notifBtn}>
              <Bell size={18} />
              <span className={styles.notifDot} />
            </button>
            <button className={styles.newBtn}>
              <span>+</span> Новая заявка
            </button>
          </div>
        </header>

        {/* ── Action bar ── */}
        <div className={styles.actionBar}>
          <div className={styles.actionBarInner}>
            <button className={styles.actionBtn}><Link2 size={14} /> Реферальная ссылка</button>
            <button className={styles.actionBtn}><QrCode size={14} /> QR-код</button>
            <button className={styles.actionBtn}><Gift size={14} /> Подарочный купон</button>
            <button className={`${styles.actionBtn} ${styles.primary}`}><ArrowRightLeft size={14} /> Передать заявку и получить кэшбек</button>
          </div>
        </div>

        {/* ── Content ── */}
        <main className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.pageHeader}>
              <h1>{getLabel(active)}</h1>
            </div>
            <SectionContent id={active} />
          </div>
        </main>

        {/* ── Footer (black) ── */}
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerSection}>
              <h4>Контакты</h4>
              <div className={styles.footerContact}>
                <Phone size={14} />
                <span>+7 (800) 100-23-45 (бесплатно)<br />+7 (495) 123-45-67 (Москва)</span>
              </div>
              <div className={styles.footerContact}>
                <Mail size={14} />
                <span>info@cayrus.ru<br />support@cayrus.ru</span>
              </div>
              <div className={styles.footerContact}>
                <MapPin size={14} />
                <span>125009, Москва,<br />ул. Тверская, д. 7, оф. 301</span>
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4>Мессенджеры и соцсети</h4>
              <div className={styles.socialGrid}>
                <a href="https://t.me/cayrus" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <Send size={14} /> Telegram
                </a>
                <a href="https://vk.com/cayrus" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <MessageSquare size={14} /> ВКонтакте / MAX
                </a>
                <a href="https://wa.me/78001002345" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>

            <div className={styles.footerSection}>
              <h4>Режим работы</h4>
              <div className={styles.footerContact}>
                <span>Пн–Пт: 9:00 — 18:00 (МСК)<br />Сб: 10:00 — 15:00<br />Вс: выходной</span>
              </div>
              <div className={styles.footerContact} style={{ marginTop: 12 }}>
                <span style={{ opacity: 0.5, fontSize: 12 }}>
                  Техническая поддержка портала:<br />support@cayrus.ru
                </span>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <span>© 2026 CAYRUS / КАУРУС. Все права защищены.</span>
            <span>Партнёрский портал v2.4</span>
          </div>
        </footer>
      </div>

      <ChatWidget />
    </div>
  );
}
