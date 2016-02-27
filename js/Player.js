var Player = function (name) {
    this.name = name || "Unknown entity";
    this.level = 1;
    this.gear = 0;
    this.gender = "Male";
    this.race = "human";
    this.gameClass = "";

    this.alterLevel = function (amount) {
        this.level += parseInt(amount);
        this.level = this.level < 1 ? 1 : this.level;
    }

    this.alterGear = function (amount) {
        this.gear += parseInt(amount);
        this.gear = this.gear < 0 ? 0 : this.gear;
    }

    this.changeGender = function () {
        if (this.gender == "Male") {
            this.gender = "Female";
        } else {
            this.gender = "Male";
        }
    }

    this.changeRace = function(race) {
        this.race = race;
    }

    this.changeGameClass = function(gameClass) {
        this.gameClass = gameClass;
    }

    this.getName = function () {
        return this.name;
    }

    this.getLevel = function () {
        return this.level;
    }

    this.getGear = function () {
        return this.gear;
    }

    this.getGender = function () {
        return this.gender;
    }

    this.getRace = function () {
        return this.race;
    }

    this.getGameClass = function () {
        return this.gameClass;
    }
};