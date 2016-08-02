'use strict';

describe('conFusion App E2E Testing', function () {

    it('should automatically redirect to / when location hash/fragment is empty', function () {

        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/");

    });

    describe('index', function () {
        beforeAll(function () {
            browser.get('index.html#/');
        });

        it('should have title', function () {
            expect(browser.getTitle()).
                toEqual('Ristorante Con Fusion');
        });

        it('should not have promotionDishMessage', function () {
            expect(browser.isElementPresent(by.binding('promotionDishMessage'))).toBe(false);
        });

        it('should have promotion dish properties as', function () {
            var promotionDishName = element(by.binding('promotionDish.name'));
            expect(promotionDishName.getText()).toEqual('Weekend Grand Buffet New 19.99');

            var promotionDishImg = element.all(by.css('[class="media-object img-thumbnail"]'))
                .get(1);
            expect(promotionDishImg.getAttribute('ng-src')).toEqual('images/buffet.png');

            var promotionDishDescription = element(by.binding('promotionDish.description'));
            expect(promotionDishDescription.getText()).toEqual(
                'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person'
            );
        });

        it('should not have executiveChefMessage', function () {
            expect(browser.isElementPresent(by.binding('executiveChefMessage'))).toBe(false);
        });

        it('should have executive chef properties as', function () {
            var executiveChefName = element(by.binding('executiveChef.name'));
            expect(executiveChefName.getText()).toContain('Alberto Somayya');

            var executiveChefImg = element.all(by.css('[class="media-object img-thumbnail"]'))
                .get(2);
            expect(executiveChefImg.getAttribute('ng-src')).toEqual('images/alberto.png');

            var executiveChefDescription = element(by.binding('executiveChef.description'));
            expect(executiveChefDescription.getText()).toEqual(
                'Award winning three-star Michelin chef with wide International experience having worked closely with whos-who in the culinary world, he specializes in creating mouthwatering Indo-Italian fusion experiences. He says, Put together the cuisines from the two craziest cultures, and you get a winning hit! Amma Mia!'
            );
        });

    });

    describe('menu', function () {
        beforeAll(function () {
            browser.get('index.html#/menu');
        });

        it('should not have "Error:Message" element', function () {
            expect(browser.isElementPresent(by.binding('message'))).toBe(false);
        });

        it('should have "showDetails" as', function () {
            expect(element(by.binding('showDetails')).getText()).toBe("Show Details");
        });

        it('should toggle details on click', function () {
            element(by.css('[ng-click="toggleDetails()"]')).click();
            expect(element(by.binding('showDetails')).getText()).toBe("Hide Details");
        });


        // Testing 'The Menu' tab

        it('should have "The Menu" as', function () {
            expect(element(by.css('.nav-tabs li:nth-child(1)'))
                .getAttribute('class'))
                .toContain('active');
        });

        it('should have number of dishes as', function () {
            expect(element.all(by.repeater('dish in dishes'))
                .count())
                .toBe(4);
        });

        it('should have correct first dish', function () {
            var elem = element.all(by.repeater('dish in dishes')).get(0);

            expect(elem.element(by.css('img')).getAttribute('ng-src'))
                .toBe('images/uthapizza.png');
            
            elem.element(by.css('a')).getAttribute('href')
                .then(function(href) {
                    expect(href.split('#')[1]).toBe('/menu/0');
                });

            expect(elem.element(by.binding('dish.name')).getText())
                .toBe('Uthapizza Hot $4.99');
        });

        it('should have correct second dish', function () {
            var elem = element.all(by.repeater('dish in dishes')).get(1);

            expect(elem.element(by.css('img')).getAttribute('ng-src'))
                .toBe('images/zucchipakoda.png');

            elem.element(by.css('a')).getAttribute('href')
                .then(function(href) {
                    expect(href.split('#')[1]).toBe('/menu/1');
                });

            expect(elem.element(by.binding('dish.name')).getText())
                .toBe('Zucchipakoda $1.99');
        });

        it('should have correct third dish', function () {
            var elem = element.all(by.repeater('dish in dishes')).get(2);

            expect(elem.element(by.css('img')).getAttribute('ng-src'))
                .toBe('images/vadonut.png');

            elem.element(by.css('a')).getAttribute('href')
                .then(function(href) {
                    expect(href.split('#')[1]).toBe('/menu/2');
                });

            expect(elem.element(by.binding('dish.name')).getText())
                .toBe('Vadonut New $1.99');
        });

        it('should have correct fourth dish', function () {
            var elem = element.all(by.repeater('dish in dishes')).get(3);

            expect(elem.element(by.css('img')).getAttribute('ng-src'))
                .toBe('images/elaicheesecake.png');

            elem.element(by.css('a')).getAttribute('href')
                .then(function(href) {
                    expect(href.split('#')[1]).toBe('/menu/3');
                });

            expect(elem.element(by.binding('dish.name')).getText())
                .toBe('ElaiCheese Cake $2.99');
        });


        // Testing 'Appetizers' tab

        it('should toggle to "Appetizers" and make it active', function () {
            element(by.css('.nav-tabs li:nth-child(2)'))
                .click();
            expect(element(by.css('.nav-tabs li:nth-child(2)'))
                .getAttribute('class'))
                .toContain('active');
        });

        it('should have number of dishes as', function () {
            expect(element.all(by.repeater('dish in dishes'))
                .count())
                .toBe(2);
        });

        it('should have correct first dish', function () {
            var elem = element.all(by.repeater('dish in dishes')).get(0);

            expect(elem.element(by.css('img')).getAttribute('ng-src'))
                .toBe('images/zucchipakoda.png');

            elem.element(by.css('a')).getAttribute('href')
                .then(function(href) {
                    expect(href.split('#')[1]).toBe('/menu/1');
                });

            expect(elem.element(by.binding('dish.name')).getText())
                .toBe('Zucchipakoda $1.99');
        });

        it('should have correct second dish', function () {
            var elem = element.all(by.repeater('dish in dishes')).get(1);

            expect(elem.element(by.css('img')).getAttribute('ng-src'))
                .toBe('images/vadonut.png');

            elem.element(by.css('a')).getAttribute('href')
                .then(function(href) {
                    expect(href.split('#')[1]).toBe('/menu/2');
                });

            expect(elem.element(by.binding('dish.name')).getText())
                .toBe('Vadonut New $1.99');
        });

        // Testing 'Mains' tab

        it('should toggle to "Mains" and make it active', function () {
            element(by.css('.nav-tabs li:nth-child(3)'))
                .click();
            expect(element(by.css('.nav-tabs li:nth-child(3)'))
                .getAttribute('class'))
                .toContain('active');
        });

        it('should have number of dishes as', function () {
            expect(element.all(by.repeater('dish in dishes'))
                .count())
                .toBe(1);
        });

        it('should have correct first dish', function () {
            var elem = element.all(by.repeater('dish in dishes')).get(0);

            expect(elem.element(by.css('img')).getAttribute('ng-src'))
                .toBe('images/uthapizza.png');

            elem.element(by.css('a')).getAttribute('href')
                .then(function(href) {
                    expect(href.split('#')[1]).toBe('/menu/0');
                });

            expect(elem.element(by.binding('dish.name')).getText())
                .toBe('Uthapizza Hot $4.99');
        });

        // Testing 'Desserts' tab

        it('should toggle to "Desserts" and make it active', function () {
            element(by.css('.nav-tabs li:nth-child(4)'))
                .click();
            expect(element(by.css('.nav-tabs li:nth-child(4)'))
                .getAttribute('class'))
                .toContain('active');
        });

        it('should have number of dishes as', function () {
            expect(element.all(by.repeater('dish in dishes'))
                .count())
                .toBe(1);
        });

        it('should have correct first dish', function () {
            var elem = element.all(by.repeater('dish in dishes')).get(0);

            expect(elem.element(by.css('img')).getAttribute('ng-src'))
                .toBe('images/elaicheesecake.png');

            elem.element(by.css('a')).getAttribute('href')
                .then(function(href) {
                    expect(href.split('#')[1]).toBe('/menu/3');
                });

            expect(elem.element(by.binding('dish.name')).getText())
                .toBe('ElaiCheese Cake $2.99');
        });

    });
});