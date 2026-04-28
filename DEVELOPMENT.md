### expectation の計算方法について

あるアイドルを一回育成した時に稼げる経験値の期待値を以下の計算の合算で定義する

1. `アイドル毎のアチーブメントの将来期待経験値`
1. `（レッスン系を除く）プロデュースアチーブメントの将来期待経験値`
1. `レッスン系アチーブメントの将来期待経験値にアイドル毎のレッスン割合を掛けた数値`

ただし、あるアチーブメントから得られる将来期待経験値 $E(\texttt{achieve})$ は以下で計算する

```math
\newcommand{\miS}{\texttt{milestone}}
\newcommand{\miSi}{\texttt{milestone}_i}
\newcommand{\cV}{\texttt{currentValue}}

\begin{aligned}
\text{gainPerProduce} &= \frac{\cV}{\texttt{numProduce}} \\
\operatorname{gainNeeded}(\miSi) &= \operatorname{milestoneThreshold}(\miSi) - \cV \\
\operatorname{produceNeeded}(\miSi) &= \frac
{
    \begin{cases}
        \operatorname{gainNeeded}(\miSi) &
        \text{if } \operatorname{gainNeeded}(\texttt{milestone}_i) > 0 \\
        0 &
        \text{otherwise}
    \end{cases}
}
{
        \text{gainPerProduce}
} \\

E(\texttt{achieve}) &= \sum_{\miSi}{
    \frac{\operatorname{milestoneExp}(\texttt{milestone}_i)}{\operatorname{Ceil}(\operatorname{produceNeeded}(\miSi))}
}
\end{aligned}
```

### おすすめ計算方法

1. 利益率が良い奴を順番に並べる
1. 利益率が良い奴の次のマイルストーンに必要なプロデュース回数を求める
