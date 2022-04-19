# ねむみ

## install tools

asdfでツールを入れてください

```sh
asdf install
```

asdf自体のインストールやpluginの入れ方は割愛

## install

```sh
yarn
```


## パッケージupgrade

```sh
yarn upgrade --latest
```

peerDepの不一致とか余計な`@types/*`消しとかvulnerabilities消しとか頑張る

おわったらpackage.jsonの内容をyarn.lockに同期させる:

```sh
npx syncyarnlock -s -k
```




## RESAS API関連

https://github.com/wand2016/nemumi/wiki/RESAS-API%E9%96%A2%E9%80%A3

APIキーの発行などしてください
