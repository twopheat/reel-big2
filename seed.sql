USE reelbig_db;

INSERT INTO catchhistory (fish_type, lat, lng, rig_type) 
VALUES ("bass", 33.866136, -117.181405, "Alpha"),
("trout", 33.868832, -117.160453, "Beta"),
("bass", 33.864458, -117.166086, "Gamma"),
("bass", 33.863995, -117.173971, "Delta");

INSERT INTO user (username) VALUES ("Sally951");
INSERT INTO user (username) VALUES ("Bob123");
INSERT INTO user (username) VALUES ("Rick808");

INSERT INTO rig (rig_name, rod, reel, tackle, info)
VALUES ("Alpha", "6ft", "5 lbs", "worm", "test 1"),
("Beta", "6ft", "7 lbs", "fly", "test 2"),
("Gamma", "5ft", "4 lbs", "lure", "test 3");