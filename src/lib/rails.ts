/** Catalog mirrored from the Android AppRegion / MoneySource model. */

export type RailKind = "wallet" | "bank";
export type RegionId = "KE" | "TZ" | "UG" | "RW";

export type Rail = {
  id: string;
  label: string;
  kind: RailKind;
};

export type SampleMove = {
  who: string;
  railId: string;
  amount: string;
};

export type RegionCatalog = {
  id: RegionId;
  name: string;
  city: string;
  currencyCode: string;
  currencySymbol: string;
  available: string;
  canSendPay: boolean;
  hasFuliza: boolean;
  /** Live on Play today. Other East African countries stay in the catalog as coming soon. */
  comingSoon: boolean;
  primaryWallet: string;
  rails: Rail[];
  sample: SampleMove[];
};

const w = (id: string, label: string): Rail => ({ id, label, kind: "wallet" });
const b = (id: string, label: string): Rail => ({ id, label, kind: "bank" });

export const regions: RegionCatalog[] = [
  {
    id: "KE",
    name: "Kenya",
    city: "Nairobi",
    currencyCode: "KES",
    currencySymbol: "Ksh",
    available: "24,180",
    canSendPay: true,
    hasFuliza: true,
    comingSoon: false,
    primaryWallet: "mpesa",
    rails: [
      w("mpesa", "M-Pesa"),
      w("airtel", "Airtel Money"),
      w("tkash", "T-Kash"),
      w("equitel", "Equitel"),
      b("kcb", "KCB"),
      b("equity", "Equity"),
      b("coop", "Co-op"),
      b("ncba", "NCBA"),
      b("absa", "Absa"),
      b("stanbic", "Stanbic"),
      b("family", "Family"),
      b("im", "I&M"),
      b("dtb", "DTB"),
      b("stanchart", "StanChart"),
      b("kwft", "KWFT"),
      b("sidian", "Sidian"),
      b("nbk", "NBK"),
      b("postbank", "Postbank"),
      b("gtbank", "GTBank"),
    ],
    sample: [
      { who: "Mama", railId: "airtel", amount: "70" },
      { who: "KPLC", railId: "kcb", amount: "1,200" },
      { who: "Naivas till", railId: "mpesa", amount: "350" },
    ],
  },
  {
    id: "TZ",
    name: "Tanzania",
    city: "Dar es Salaam",
    currencyCode: "TZS",
    currencySymbol: "TSh",
    available: "186,400",
    canSendPay: false,
    hasFuliza: false,
    comingSoon: true,
    primaryWallet: "mpesa",
    rails: [
      w("mpesa", "M-Pesa"),
      w("airtel", "Airtel Money"),
      w("mixx", "Mixx"),
      w("halo", "HaloPesa"),
      b("crdb", "CRDB"),
      b("nmb", "NMB"),
      b("nbc", "NBC"),
      b("equity", "Equity"),
      b("stanbic", "Stanbic"),
      b("absa", "Absa"),
      b("kcb", "KCB"),
    ],
    sample: [
      { who: "Daladala", railId: "mixx", amount: "2,000" },
      { who: "CRDB transfer", railId: "crdb", amount: "45,000" },
      { who: "Mama", railId: "mpesa", amount: "10,000" },
    ],
  },
  {
    id: "UG",
    name: "Uganda",
    city: "Kampala",
    currencyCode: "UGX",
    currencySymbol: "USh",
    available: "412,000",
    canSendPay: false,
    hasFuliza: false,
    comingSoon: true,
    primaryWallet: "mtn",
    rails: [
      w("mtn", "MTN MoMo"),
      w("airtel", "Airtel Money"),
      b("centenary", "Centenary"),
      b("stanbic", "Stanbic"),
      b("equity", "Equity"),
      b("absa", "Absa"),
      b("kcb", "KCB"),
      b("dtb", "DTB"),
    ],
    sample: [
      { who: "Boda", railId: "mtn", amount: "8,000" },
      { who: "Centenary", railId: "centenary", amount: "120,000" },
      { who: "Airtel", railId: "airtel", amount: "15,000" },
    ],
  },
  {
    id: "RW",
    name: "Rwanda",
    city: "Kigali",
    currencyCode: "RWF",
    currencySymbol: "FRw",
    available: "98,500",
    canSendPay: false,
    hasFuliza: false,
    comingSoon: true,
    primaryWallet: "mtn",
    rails: [
      w("mtn", "MTN MoMo"),
      w("airtel", "Airtel Money"),
      b("bk", "Bank of Kigali"),
      b("equity", "Equity"),
      b("kcb", "KCB"),
      b("im", "I&M"),
    ],
    sample: [
      { who: "Moto", railId: "mtn", amount: "1,200" },
      { who: "BK", railId: "bk", amount: "34,000" },
      { who: "Market", railId: "airtel", amount: "4,500" },
    ],
  },
];

export function regionById(id: RegionId): RegionCatalog {
  return regions.find((region) => region.id === id) ?? regions[0];
}

export function starterIds(region: RegionCatalog): string[] {
  const extraWallet = region.rails.find(
    (rail) => rail.kind === "wallet" && rail.id !== region.primaryWallet
  );
  const firstBank = region.rails.find((rail) => rail.kind === "bank");
  return [region.primaryWallet, extraWallet?.id, firstBank?.id].filter(
    (id): id is string => Boolean(id)
  );
}

export function railLabel(region: RegionCatalog, id: string): string {
  return region.rails.find((rail) => rail.id === id)?.label ?? id;
}
