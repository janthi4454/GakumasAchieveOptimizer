// import type { AppConfig } from "./types";

import type z from "zod";
import type { AppConfigSchema } from "./schema";


type AppConfig = z.infer<typeof AppConfigSchema>

export const CONFIG: AppConfig = {
    "achievements": {
        "numProduce": {
            name: "プロデュース回数",
            milestones: [
                {
                    "threshold": 1,
                    "exp": 250
                },
                {
                    "threshold": 10,
                    "exp": 400
                },
                {
                    "threshold": 50,
                    "exp": 1_000
                },
                {
                    "threshold": 100,
                    "exp": 1_600
                },
                {
                    "threshold": 200,
                    "exp": 2_000
                },
            ]
        },
        "numCardUsed": {
            name: "スキルカード使用回数",
            milestones: [
                {
                    "threshold": 250,
                    "exp": 300,
                },
                {
                    "threshold": 1500,
                    "exp": 700,
                },
                {
                    "threshold": 6_000,
                    "exp": 1_300,
                },
                {
                    "threshold": 20_000,
                    "exp": 2_000,
                },
                {
                    "threshold": 40_000,
                    "exp": 2_600,
                },
            ],
        },
        "numLesson": {
            name: "レッスンクリア回数",
            milestones: [
                {
                    "threshold": 10,
                    "exp": 300,
                },
                {
                    "threshold": 100,
                    "exp": 700,
                },
                {
                    "threshold": 300,
                    "exp": 1_000,
                },
                {
                    "threshold": 1_200,
                    "exp": 2_000,
                },
                {
                    "threshold": 2_500,
                    "exp": 2_600,
                },
            ],
        },
        "numSPLesson": {
            name: "SPレッスンクリア回数",
            milestones: [
                {
                    "threshold": 15,
                    "exp": 300,
                },
                {
                    "threshold": 50,
                    "exp": 700,
                },
                {
                    "threshold": 2_00,
                    "exp": 1_300,
                },
                {
                    "threshold": 700,
                    "exp": 2_000,
                },
                {
                    "threshold": 1_250,
                    "exp": 2_600,
                },
            ],
        },
        "numPassExam": {
            name: "最終試験合格回数",
            milestones: [
                {
                    "threshold": 5,
                    "exp": 300,
                },
                {
                    "threshold": 40,
                    "exp": 1_000,
                },
                {
                    "threshold": 100,
                    "exp": 1_600,
                },
                {
                    "threshold": 200,
                    "exp": 2_000,
                },
                {
                    "threshold": 400,
                    "exp": 2_600,
                },
            ],

        },
        "numFan": {
            name: "ファン人数",
            milestones: [
                {
                    "threshold": 70_000,
                    "exp": 400,
                },
                {
                    "threshold": 300_000,
                    "exp": 1_000,
                },
                {
                    "threshold": 600_000,
                    "exp": 1_300,
                },
                {
                    "threshold": 1_000_000,
                    "exp": 1_600,
                },
                {
                    "threshold": 3_000_000,
                    "exp": 2_600,
                },
            ],
        },
        "evaluatedPoint": {
            name: "評価合計",
            milestones: [
                {
                    "threshold": 50_000,
                    "exp": 300,
                },
                {
                    "threshold": 500_000,
                    "exp": 1_300,
                },
                {
                    "threshold": 1_000_000,
                    "exp": 1_600,
                },
                {
                    "threshold": 2_000_000,
                    "exp": 2_000,
                },
                {
                    "threshold": 4_000_000,
                    "exp": 2_600,
                },
            ],
        },
        "numDrinkUsed": {
            name: "ドリンク使用数",
            milestones: [
                {
                    "threshold": 30,
                    "exp": 300,
                },
                {
                    "threshold": 300,
                    "exp": 1_300,
                },
                {
                    "threshold": 500,
                    "exp": 1_600,
                },
                {
                    "threshold": 1_000,
                    "exp": 2_000,
                },
                {
                    "threshold": 2_000,
                    "exp": 2_600,
                },
            ],
        },
        "energyGot": {
            name: "獲得元気合計",
            milestones: [
                {
                    "threshold": 1_000,
                    "exp": 300,
                },
                {
                    "threshold": 15_000,
                    "exp": 1_300,
                },
                {
                    "threshold": 30_000,
                    "exp": 1_600,
                },
                {
                    "threshold": 50_000,
                    "exp": 2_000,
                },
                {
                    "threshold": 100_000,
                    "exp": 2_600,
                },
            ],
        },
        "numCardUpgrade": {
            name: "スキルカード強化回数",
            milestones: [
                {
                    "threshold": 20,
                    "exp": 300,
                },
                {
                    "threshold": 250,
                    "exp": 1_300,
                },
                {
                    "threshold": 500,
                    "exp": 1_600,
                },
                {
                    "threshold": 1_000,
                    "exp": 2_000,
                },
                {
                    "threshold": 2_000,
                    "exp": 2_600,
                },
            ],
        },
        "asari": {
            name: "相談交換回数",
            milestones: [
                {
                    "threshold": 15,
                    "exp": 300,
                },
                {
                    "threshold": 250,
                    "exp": 1_300,
                },
                {
                    "threshold": 500,
                    "exp": 1_600,
                },
                {
                    "threshold": 1_000,
                    "exp": 2_000,
                },
                {
                    "threshold": 2_000,
                    "exp": 2_600,
                },
            ],
        },
        "healthUsed": {
            name: "消費体力合計",
            milestones: [
                {
                    "threshold": 500,
                    "exp": 300,
                },
                {
                    "threshold": 15_000,
                    "exp": 1_300,
                },
                {
                    "threshold": 30_000,
                    "exp": 1_600,
                },
                {
                    "threshold": 45_000,
                    "exp": 2_000,
                },
                {
                    "threshold": 90_000,
                    "exp": 2_600,
                },
            ],
        },
        "numSpecialAsari": {
            name: "特別指導回数",
            milestones: [
                {
                    threshold: 20,
                    exp: 1_400,
                },
                {
                    threshold: 60,
                    exp: 1_700,
                }
            ],
        },
        "numFanVoting": {
            name: "ファン投票数",
            milestones: [
                {

                    threshold: 300_000,
                    exp: 1_400,
                },
                {

                    threshold: 1_000_000,
                    exp: 1_700,
                }
            ],
        },
    },
    "totalAchievements": {
        "totalProduce": {
            name: "積み重なる経験",
            featureName: "プロデュース完了回数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 3,
                    "exp": 100,
                },
                {
                    "threshold": 20,
                    "exp": 300,
                },
                {
                    "threshold": 100,
                    "exp": 1_250,
                },
                {
                    "threshold": 500,
                    "exp": 3_700,
                },
                {
                    "threshold": 1_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 1_500,
                    "exp": 0,
                },
            ]
        },
        "totalPPoint": {
            name: "縁の下の力持ち",
            featureName: "Pポイント",
            routeRecom: ["PPoint"],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 2_000,
                    "exp": 100,
                },
                {
                    "threshold": 15_000,
                    "exp": 300,
                },
                {
                    "threshold": 100_000,
                    "exp": 1_250,
                },
                {
                    "threshold": 200_000,
                    "exp": 2_950,
                },
                {
                    "threshold": 500_000,
                    "exp": 3_700,
                },
                {
                    "threshold": 700_000,
                    "exp": 3_700,
                },
                {
                    "threshold": 1_000_000,
                    "exp": 0,
                },
            ],
        },
        "totalCards": {
            name: "テクニシャン",
            featureName: "スキルカード獲得回数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 50,
                    "exp": 100,
                },
                {
                    "threshold": 400,
                    "exp": 300,
                },
                {
                    "threshold": 2_000,
                    "exp": 1_250,
                },
                {
                    "threshold": 4_000,
                    "exp": 2_950,
                },
                {
                    "threshold": 12_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 18_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 24_000,
                    "exp": 0,
                },
            ],
        },
        "totalPItem": {
            name: "サポート上手",
            featureName: "Pアイテム獲得数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 30,
                    "exp": 100,
                },
                {
                    "threshold": 100,
                    "exp": 300,
                },
                {
                    "threshold": 600,
                    "exp": 3_250,
                },
                {
                    "threshold": 1_500,
                    "exp": 3_700,
                },
                {
                    "threshold": 5_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 7_500,
                    "exp": 0,
                },
            ],
        },
        "totalPDrink": {
            name: "水分補給！",
            featureName: "Pアイテム獲得数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 50,
                    "exp": 100,
                },
                {
                    "threshold": 200,
                    "exp": 300,
                },
                {
                    "threshold": 1_000,
                    "exp": 3_250,
                },
                {
                    "threshold": 2_500,
                    "exp": 3_700,
                },
                {
                    "threshold": 10_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 15_000,
                    "exp": 0,
                },
            ],
        },
        "totalVoLesson": {
            name: "ボーカルマスター",
            featureName: "ボーカルレッスン",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 30,
                    "exp": 150,
                },
                {
                    "threshold": 100,
                    "exp": 400,
                },
                {
                    "threshold": 750,
                    "exp": 2_950,
                },
                {
                    "threshold": 1_500,
                    "exp": 3_700,
                },
                {
                    "threshold": 4_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 5_000,
                    "exp": 0,
                },
            ],
        },
        "totalDaLesson": {
            name: "ダンスマスター",
            featureName: "ダンスレッスン",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 30,
                    "exp": 150,
                },
                {
                    "threshold": 100,
                    "exp": 400,
                },
                {
                    "threshold": 750,
                    "exp": 2_950,
                },
                {
                    "threshold": 1_500,
                    "exp": 3_700,
                },
                {
                    "threshold": 4_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 5_000,
                    "exp": 0,
                },
            ],
        },
        "totalViLesson": {
            name: "ビジュアルマスター",
            featureName: "ビジュアルレッスン",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 30,
                    "exp": 150,
                },
                {
                    "threshold": 100,
                    "exp": 400,
                },
                {
                    "threshold": 750,
                    "exp": 2_950,
                },
                {
                    "threshold": 1_500,
                    "exp": 3_700,
                },
                {
                    "threshold": 4_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 5_000,
                    "exp": 0,
                },
            ],
        },
        "totalSupplies": {
            name: "備えあれば憂いなし",
            featureName: "活動支給選択回数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 40,
                    "exp": 400,
                },
                {
                    "threshold": 150,
                    "exp": 2_950,
                },
                {
                    "threshold": 300,
                    "exp": 3_250,
                },
                {
                    "threshold": 700,
                    "exp": 3_700,
                },
                {
                    "threshold": 1_400,
                    "exp": 6_000,
                },
                {
                    "threshold": 2_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 3_000,
                    "exp": 0,
                },
            ],
        },
        "totalOdekakeOrClass": {
            name: "学園生活",
            featureName: "授業・おでかけ選択回数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 50,
                    "exp": 400,
                },
                {
                    "threshold": 200,
                    "exp": 2_950,
                },
                {
                    "threshold": 500,
                    "exp": 3_250,
                },
                {
                    "threshold": 1_000,
                    "exp": 3_700,
                },
                {
                    "threshold": 2_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 4_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 6_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 8_000,
                    "exp": 0,
                },
            ],
        },
        "totalCardUpgrade": {
            name: "指導上手",
            featureName: "スキルカード強化回数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 30,
                    "exp": 150,
                },
                {
                    "threshold": 150,
                    "exp": 300,
                },
                {
                    "threshold": 400,
                    "exp": 1_250,
                },
                {
                    "threshold": 800,
                    "exp": 3_250,
                },
                {
                    "threshold": 2_000,
                    "exp": 3_700,
                },
                {
                    "threshold": 4_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 6_000,
                    "exp": 0,
                },
            ],
        },
        "totalAsari": {
            name: "常連さん",
            featureName: "相談回数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 50,
                    "exp": 300,
                },
                {
                    "threshold": 200,
                    "exp": 400,
                },
                {
                    "threshold": 500,
                    "exp": 1_200,
                },
                {
                    "threshold": 2_000,
                    "exp": 2_950,
                },
                {
                    "threshold": 5_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 6_000,
                    "exp": 0,
                },
                {
                    "threshold": 8_000,
                    "exp": 0,
                },
            ],
        },
        "totalLesson": {
            name: "日々の鍛錬",
            featureName: "レッスンクリア回数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 30,
                    "exp": 100,
                },
                {
                    "threshold": 90,
                    "exp": 300,
                },
                {
                    "threshold": 300,
                    "exp": 400,
                },
                {
                    "threshold": 1_000,
                    "exp": 3_250,
                },
                {
                    "threshold": 4_000,
                    "exp": 3_700,
                },
                {
                    "threshold": 6_000,
                    "exp": 3_700,
                },
                {
                    "threshold": 8_000,
                    "exp": 0,
                },
            ],
        },
        "totalSPLesson": {
            name: "気合を入れて",
            featureName: "SPレッスンクリア回数",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 30,
                    "exp": 300,
                },
                {
                    "threshold": 100,
                    "exp": 400,
                },
                {
                    "threshold": 500,
                    "exp": 2_950,
                },
                {
                    "threshold": 1_000,
                    "exp": 3_700,
                },
                {
                    "threshold": 3_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 4_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 8_000,
                    "exp": 0,
                },
            ],
        },
        "totalEnergy": {
            name: "熱血指導",
            featureName: "体力消費合計",
            routeRecom: [],
            lessonRecom: [],
            milestones: [
                {
                    "threshold": 500,
                    "exp": 150,
                },
                {
                    "threshold": 1_500,
                    "exp": 300,
                },
                {
                    "threshold": 10_000,
                    "exp": 1_250,
                },
                {
                    "threshold": 30_000,
                    "exp": 2_950,
                },
                {
                    "threshold": 100_000,
                    "exp": 6_000,
                },
                {
                    "threshold": 120_000,
                    "exp": 0,
                },
            ],
        },
        // "template": {
        //     name: "",
        //     featureName: "",
        //     routeRecom: [],
        //     lessonRecom: [],
        //     milestones: [
        //         {
        //             "threshold": ,
        //             "exp": ,
        //         },
        //     ],
        // },
    },
    "idols": {
        saki: {
            family_name: "花海",
            name: "咲季",
            color: "#e30f25",
            primary: "Vi",
            secondary: "Da",
        },
        temari: {
            family_name: "月村",
            name: "手毬",
            color: "#0c7bbb",
            primary: "Vo",
            secondary: "Da",
        },
        kotone: {
            family_name: "藤田",
            name: "ことね",
            color: "#f8c112",
            primary: "Da",
            secondary: "Vi",
        },
        "tsubame": {
            "family_name": "雨夜",
            "name": "燕",
            "color": "#7b68ee",
            "primary": "Da",
            "secondary": "Vo",
        },
        "mao": {
            "family_name": "有村",
            "name": "麻央",
            "color": "#7f1184",
            "primary": "Vo",
            "secondary": "Vi",
        },
        "lilja": {
            "family_name": "葛城",
            "name": "リーリヤ",
            "color": "#eafdff",
            "primary": "Vi",
            "secondary": "Da",
        },
        // "rinha": {
        //     "family_name": "賀陽",
        //     "name": "燐羽",
        //     "color": "",
        //     "primary": "",
        //     "secondary": "",
        // },
        "china": {
            "family_name": "倉本",
            "name": "千奈",
            "color": "#f68b1f",
            "primary": "Da",
            "secondary": "Vi",
        },
        "sumika": {
            "family_name": "紫雲",
            "name": "清夏",
            "color": "#7cfc00",
            "primary": "Da",
            "secondary": "Vi",
        },
        "hiro": {
            "family_name": "篠澤",
            "name": "広",
            "color": "#00afcc",
            "primary": "Vo",
            "secondary": "Da",
        },
        "sena": {
            "family_name": "十王",
            "name": "星南",
            "color": "#f6ae54",
            "primary": "Vi",
            "secondary": "Vo",
        },
        "misuzu": {
            "family_name": "秦谷",
            "name": "美鈴",
            "color": "#7a99cf",
            "primary": "Vo",
            "secondary": "Vi",
        },
        "ume": {
            "family_name": "花海",
            "name": "佑芽",
            "color": "#ea533a",
            "primary": "Da",
            "secondary": "Vo",
        },
        "rinami": {
            "family_name": "姫崎",
            "name": "莉波",
            "color": "#f6adc6",
            "primary": "Vi",
            "secondary": "Da",
        },
        // "template": {
        //     "family_name": "",
        //     "name": "",
        //     "color": "",
        //     "primary": "",
        //     "secondary": "",
        // },
    },
    "achievementMapping": {
        saki: {
            "numCardUsed": "もう逃げない",
            "numLesson": "入学試験主席の力よ！",
            "numSPLesson": "早熟の天才",
            "numPassExam": "合格は当たり前",
            "numProduce": "妹への挑戦",
            "numFan": "小さなお姉ちゃん",
            "evaluatedPoint": "トップまで止まらない",
            "numCardUpgrade": "無限の向上心",
            "numSpecialAsari": "トップアイドルに必要なもの",
            "numFanVoting": "外付けの筋肉",
        },
        temari: {
            "numCardUsed": "体質改善",
            "numLesson": "ストイック",
            "numSPLesson": "ワンマンシンガー",
            "numProduce": "意地とプライド",
            "numPassExam": "当然です",
            "numFan": "孤高の負けず嫌い",
            "numCardUpgrade": "全身全霊",
            "asari": "妥協はナシ",
            "numSpecialAsari": "計画外のプロデュース",
            "numFanVoting": "特別で運命",
        },
        kotone: {
            "numCardUsed": "QOL",
            "numLesson": "イチバンかわいい",
            "numSPLesson": "世界一かわいい",
            "numProduce": "成り上がれ！",
            "numPassExam": "もっと褒めてぇ～♡",
            "numFan": "初星学園の看板娘",
            "evaluatedPoint": "アイドル適正Ｓ",
            "asari": "やりくり上手",
            "numSpecialAsari": "比類なきアイドルの才能",
            "numFanVoting": "未来の財源",
        },
        tsubame: {
            "numProduce": "反逆の狼煙",
            "numCardUsed": "現状把握",
            "numLesson": "学園No.2の実力",
            "numSPLesson": "生来の才能",
            "numPassExam": "絶えない炎",
            "numFan": "悪役系アイドル",
            "energyGot": "打ち負かすために",
            "numDrinkUsed": "滋養強壮",
            "numSpecialAsari": "果たし状",
            "numFanVoting": "救うべき者たち",
        },
        mao: {
            "numCardUsed": "カッコよさだけじゃない",
            "numLesson": "道場仕込みの運動神経",
            "numSPLesson": "ハイブリッド",
            "numProduce": "諦めきれない夢",
            "numPassExam": "まだ見ぬ境地",
            "numFan": "リトルプリンス",
            "numDrinkUsed": "爽やかドリンク",
            "healthUsed": "護身術の達人",
            "numSpecialAsari": "プリンス麻央イリュージョン",
            "numFanVoting": "たくさんの喝采",
        },
        lilja: {
            "numCardUsed": "笑顔の練習",
            "numLesson": "基本の『き』から",
            "numSPLesson": "ビジバシやります",
            "numProduce": "勇気を出して",
            "numPassExam": "走り続けたその先",
            "numFan": "真っ直ぐな眼差し",
            "energyGot": "大きく声を出して",
            "numCardUpgrade": "踏み出す勇気",
            "numSpecialAsari": "最後に笑うために",
            "numFanVoting": "ひとりひとり、大切な存在",
        },
        // rinha: {
        //     "numCardUsed": "",
        //     "numLesson": "",
        //     "numSPLesson": "",
        //     "numProduce": "",
        //     "numPassExam": "",
        //     "numFan": "",
        //     "evaluatedPoint": "",
        //     "numCardUpgrade": "",
        //     "asari": "",
        //     "numSpecialAsari": "",
        //     "numFanVoting": "",
        // },
        china: {
            "numCardUsed": "練習、練習、また練習",
            "numLesson": "スタートライン",
            "numSPLesson": "元気一点突破",
            "numProduce": "落ちこぼれからの挑戦",
            "numPassExam": "落ちこぼれとは言わせない",
            "numFan": "愛されアイドル",
            "energyGot": "天真爛漫",
            "asari": "財力",
            "numSpecialAsari": "961式プロデュース改",
            "numFanVoting": "わたくしの宝物",
        },
        sumika: {
            "numCardUsed": "まずは遊びから",
            "numLesson": "センスは抜群",
            "numSPLesson": "前を向いて",
            "numProduce": "諦められない",
            "numPassExam": "本気を出せば",
            "numFan": "トモダチ",
            "numDrinkUsed": "流行りはバッチリ",
            "healthUsed": "調子いいかも♪",
            "numSpecialAsari": "全力で頼る覚悟",
            "numFanVoting": "羽ばたくための力",
        },
        hiro: {
            "numCardUsed": "課題達成",
            "numLesson": "倒れなかった回数",
            "numSPLesson": "辛いほどいい",
            "numProduce": "茨の道",
            "numPassExam": "あたってくだけろ",
            "numFan": "放っておけない",
            "evaluatedPoint": "才能なしでもやれること",
            "energyGot": "苦難こそ喜び",
            "numSpecialAsari": "地獄のですろーど",
            "numFanVoting": "変わり者がいっぱい",
        },
        sena: {
            "numCardUsed": "新しい一面",
            "numLesson": "積み上げたもの",
            "numSPLesson": "強く輝く星",
            "numProduce": "可能性を求めて",
            "numPassExam": "限界のその先へ",
            "numFan": "幼い頃のように",
            "asari": "全部頂戴",
            "healthUsed": "すべてを糧にして",
            "numSpecialAsari": "育む輝き",
            "numFanVoting": "スターゲイザー",
        },
        misuzu: {
            "numCardUsed": "あの手この手で",
            "numLesson": "今日は曇り空",
            "numSPLesson": "眠れる獅子",
            "numProduce": "もう一度、やり直し",
            "numPassExam": "うららかな道を",
            "numFan": "みんなでお昼寝",
            "evaluatedPoint": "いつでもマイペース",
            "numCardUpgrade": "お世話好き",
            "numSpecialAsari": "快適な道案内",
            "numFanVoting": "わたしだけのファン",
        },
        ume: {
            "numCardUsed": "姉への挑戦",
            "numLesson": "地道なトレーニング",
            "numSPLesson": "無限の体力",
            "numProduce": "考える前に動け",
            "numPassExam": "輝く原石",
            "numFan": "王道アイドル",
            "numDrinkUsed": "たくさんほしいです！",
            "energyGot": "溢れ出る元気",
            "numSpecialAsari": "圧倒的な数値",
            "numFanVoting": "自分の一部",
        },
        rinami: {
            "numCardUsed": "理想の姉へ",
            "numLesson": "ほのかな芽生え",
            "numSPLesson": "あふれだす想い",
            "numProduce": "今度こそリスタート",
            "numPassExam": "お姉さんとの約束だよ",
            "numFan": "お姉さんの包容力",
            "numDrinkUsed": "心に潤いを",
            "healthUsed": "真面目にこつこつ",
            "numSpecialAsari": "お姉さん力強化週間",
            "numFanVoting": "守るべき存在",
        },
        // template: {
        //     "numCardUsed": "",
        //     "numLesson": "",
        //     "numSPLesson": "",
        //     "numProduce": "",
        //     "numPassExam": "",
        //     "numFan": "",
        //     "evaluatedPoint": "",
        //     "numCardUpgrade": "",
        //     "asari": "",
        //     "numDrinkUsed": "",
        //     "energyGot": "",
        //     "healthUsed": "",
        //     "numSpecialAsari": "",
        //     "numFanVoting": "",
        // },
    }
};