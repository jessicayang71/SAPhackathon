CREATE TABLE lunch (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurantName text,
  partyName text,
  partySize int,
  startTime datetime,
  attendees text
);

CREATE TABLE comment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  restaurantName text,
  startTime datetime,
  author text,
  content text
);

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Minami', datetime('now'), 'andrew', 'So.....their creamy chicken broth is like no other. I literally drained all the soup undeterred by the probably gajillion calories I had just consumed.
Their charshiu is also tender and soft - perfectly fat. Their seaweed is moist and delicious, not the rectangular dried pieces of seaweed usually used in ramen.
One thing I will note is that an egg is 1.50 which is pretty pricey, and on top of that it was cold!! BUT, this is the only slight con I could find!');

INSERT INTO lunch (restaurantName, partyName, partySize, startTime, attendees)
VALUES
 ('mcdonalds', 'cool kids', 3, datetime('now'), '["me", "myself", "i" ]');

 select strftime('%d-%m-%Y %H:%M:%S', 
 	(select startTime from lunch));
 
INSERT INTO lunch (restaurantName, partyName, partySize, startTime, attendees)
VALUES
 (?, ?, ?, ?, ?);





INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Marutama', datetime('now'), 'andrew', 'So.....their creamy chicken broth is like no other. I literally drained all the soup undeterred by the probably gajillion calories I had just consumed.
Their charshiu is also tender and soft - perfectly fat. Their seaweed is moist and delicious, not the rectangular dried pieces of seaweed usually used in ramen.
One thing I will note is that an egg is 1.50 which is pretty pricey, and on top of that it was cold!! BUT, this is the only slight con I could find!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Marutama', datetime('now'), 'letao', '1 check-in
The wife and I visited​ this place as it was so convenient​ from where we were staying. We had to kill sometime before heading to the airport and as the afternoon brought rain showers and cold weather, we craved something brothy, frothy, homey, and warm. The answer came in the form of Ramen. As we had visited Japan prior to Van City, we had a very high expectation for ramen taste.

Marutama immediately​ brought us back to the streets of Japan where our favorite ramen was tasted.

A traditional Japanese​restaurant​ in both food and ambiance, it is great for meetups​, dates, dinner, or family fun runs. Highly recommend this ramen spot if you are in the beautiful city of Vancouver!!! 10/10');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Marutama', datetime('now'), 'letao', 'This ramen was SO good, perfect for cold weather. I got the tamago ramen (mild) and the broth was delicious- different from most ramen shops I ave been to which can taste too salty and saturated with MSG. It tasted like a creamy chicken broth which paired perfectly with the soft and chewy noodles. Tender pork belly with the signature soft-yolk egg. There was a short line outside when I went around dinner time but did not take too long to be seated. Overall great ramen- would recommend!!');



INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Cactus Club Cafe', datetime('now'), 'andrew', 'Freaken amazing happy hour. This was my first meal in Vancouver (12:30AM) and it was great.

Truffle fries: crispy and the aioli was on point!

Guacamole: hint of lime and cherry tomatoes were a great mix');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Cactus Club Cafe', datetime('now'), 'letao', 'This.. was an okay Cactus Club. The staff seem.. so serious in their face. They barely smile; they come off as intimidating or unfriendly which isnt warming at all unlike the other locations! Even the manager. However, the food is great of course and our server was never delayed or neglected us. Just.. smile guys. SMILE!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Cactus Club Cafe', datetime('now'), 'letao', 'The wait was long because we had a party of 10. But for table of 2-4, seemed to have been seated pretty quickly. 
The FRose drink was good. We had the burgers, duck sandwich, few appetizers, and a pasta.  ');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Gong Cha', datetime('now'), 'andrew', 'I would recommend trying their specialty drinks and their milk foams');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Gong Cha', datetime('now'), 'letao', 'We ordered the lemon winter melon bubble tea. Flavour was 10/10!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Minami', datetime('now'), 'allen', 'Gong cha is indistinguishable from other large chains like Chatime or Coco. If you are craving it, go for it!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('McDonalds', datetime('now'), 'allen', 'Gong cha is indistinguishable from other large chains like Chatime or Coco. If you are craving it, go for it!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Tacofino', datetime('now'), 'allen', 'Gong cha is indistinguishable from other large chains like Chatime or Coco. If you are craving it, go for it!');


INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Starbucks', datetime('now'), 'allen', 'Gong cha is indistinguishable from other large chains like Chatime or Coco. If you are craving it, go for it!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Flying Pig', datetime('now'), 'allen', 'Gong cha is indistinguishable from other large chains like Chatime or Coco. If you are craving it, go for it!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Yaletown Brewery Company', datetime('now'), 'allen', 'Gong cha is indistinguishable from other large chains like Chatime or Coco. If you are craving it, go for it!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('The Keg', datetime('now'), 'allen', 'Gong cha is indistinguishable from other large chains like Chatime or Coco. If you are craving it, go for it!');

INSERT INTO comment (restaurantName, startTime, author, content)
VALUES
('Rain Or Shine', datetime('now'), 'allen', 'Gong cha is indistinguishable from other large chains like Chatime or Coco. If you are craving it, go for it!');