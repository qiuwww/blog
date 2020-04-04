SELECT SQL_CALC_FOUND_ROWS *
FROM douban_chart_movies
order by id
limit 0,10;

select found_rows();