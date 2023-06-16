create table category(
id_category serial primary key,
name_category varchar(50)
);

create table author(
id_author serial primary key,
name_author varchar(50),
nacionality varchar(50)
);

create table editorial(
id_editorial serial primary key,
name_editorial varchar(50)
);
 
create table book(
isbn serial primary key,
title varchar(255),
score integer,
published_date integer,
id_category integer,
id_author integer,
id_editorial integer,
constraint fk_book_category foreign key(id_category) references category(id_category) on
delete cascade,
constraint fk_book_author foreign key(id_author) references author(id_author) on delete
cascade,constraint fk_book_editorial foreign key(id_editorial) references editorial(id_editorial) on
delete cascade
);

create table users(
id_user serial primary key,
full_name varchar(255),
cellphone integer,
address varchar(255),
roles varchar(255),
email varchar(255),
password varchar(255)
);

create table loan (
  id_loan serial primary key,
  loan_date date,
  devolution_date date,
  id_user integer,
  isbn integer,
  delivered boolean,
  constraint fk_loan_user foreign key(id_user) references users(id_user),
  constraint fk_loan_book foreign key(isbn) references book(isbn)
);