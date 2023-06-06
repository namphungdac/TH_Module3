drop database homestay;
create database if not exists homestay;
use homestay;

create table homestayInfo(
	hsID int primary key auto_increment not null,
    hsName varchar(50) not null,
    city varchar(50) not null,
    bedroomNumber int not null,
    price int not null,
    toiletNumber int not null,
    describer nvarchar(10000) not null
);

update homestayInfo set hsName = 'aa', city = 'aa', bedroomNumber = 4, price = 300, toiletNumber = 5, describer = 'aa' where hsID = 1;

-- select * from homestayInfo where hsID = 2;

-- insert into homestayInfo (hsName, city, bedroomNumber, price, toiletNumber, describer) values  ('Alice', 'Ha Noi', 4, 300, 5, 'This hometay is very prety');

insert into homestayInfo () values
(1, 'Mark', 'Otto', 4, 100, 5, 'This hometay is very beautyfull '),
(2, 'Jacob', 'Thrnton', 6, 100, 3, 'This hometay is very expensive '),
(3, 'Larry', 'the Bird', 8, 200, 7, 'This hometay is very large ');