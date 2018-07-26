function title (brand, model) {
  let int  = rand_int(5, 10);
  let year = rand_int(2014, 2018);
  let list = [
    '风尚型', '奢华型', '经济型', '商用型', '运动型',
  ];

  let type = list[ rand_int(0, list.length - 1) ];

  return `${brand || ''} ${model} ${int}成新 ${year} ${type}`;
}

function price () {
  return rand(1, 500, 1);
}

function reason () {
  let list = [
    '换钱买房', '换钱买凶', '换钱买比特币', '换钱买股票', '分手费变现',
  ];

  return list[ rand_int(0, list.length - 1) ];
}

function consumed () {
  return rand_int(1, 50);
}

function rand_bool () {
  return Math.random() >= .5;
}

function rand_deadline () {
  let d     = new Date;
  let year  = d.getFullYear();
  let month = d.getMonth();
  let date  = d.getDate();

  return rand_date(
    year, year,
    month, month + rand_int(0, 1),
    date, date + rand_int(1, 20),
  );
}

function rand_date (min_year = 2015, max_year, min_month = 1, max_month = 12, min_day = 1, max_day = 28) {

  max_year = max_year || (new Date).getFullYear();

  let year  = rand_int(min_year, max_year);
  let month = rand_int(min_month, max_month);
  let day   = rand_int(min_day, max_day);

  return `${year}-${month}-${day}`;
}

function rand_int (min = 0, max = 100) {
  return Math.round(rand(min, max));
}

function rand (min = 0, max = 100, precision = 2) {
  return (Math.random() * (max - min) + min).toFixed(precision);
}

export default {
  title, rand_int, price, reason, consumed,
  rand_date, rand_bool, rand_deadline,
};
