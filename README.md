# get bash.im rss

Модуль обращается к цитатнику рунета [bash.im](https://bash.im/) и возвращает в промисе массив содержимого ленты.
Структура содержимого:

```js
{
  id: "string"; // id заметки
  title: "string"; // заголовок заметки
  contents: "string"; // заметка
}
```

## Install

```
npm install @stanislavkarol/get-bash-im-rss -S
```

## Example

```js
const getListBashOrg = require("@stanislavkarol/get-bash-im-rss");

getListBashOrg().then((k) => {
  console.log(k.length);
  if (k.length) {
    console.log(k[0].content);
  }
});
```
