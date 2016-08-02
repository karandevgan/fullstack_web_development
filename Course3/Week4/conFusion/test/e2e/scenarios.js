'use strict';

describe('conFusion App E2E Testing', function () {

    it('should automatically redirect to / when location hash/fragment is empty', function () {

        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch("/");

    });

    describe('index', function () {
        beforeEach(function () {
            browser.get('index.html#/');
        });

        it('should have title', function () {
            expect(browser.getTitle()).
                toEqual('Ristorante Con Fusion');
        });

        it('should have featured dish properties as', function () {
            var featuredDishName = element(by.binding('featuredDish.name'));
            expect(featuredDishName.getText()).toEqual('Uthapizza Hot 4.99');

            var featuredDishImg = element.all(by.css('[class="media-object img-thumbnail"]'))
                .get(0);
            expect(featuredDishImg.getAttribute('ng-src')).toEqual('images/uthapizza.png');

            var featuredDishDescription = element(by.binding('featuredDish.description'));
            expect(featuredDishDescription.getText()).toEqual(
                'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
            );
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


    describe('menu 0 item', function () {
        beforeEach(function () {
            browser.get('index.html#/menu/0');
        });

        it('should have a name', function () {
            var name = element(by.binding('dish.name'));
            expect(name.getText())
                .toEqual('Uthapizza Hot $4.99');
        });

        it('should show number of comments as', function () {
            expect(element.all(by.repeater('comment in dish.comments'))
                .count()).toEqual(7);
        });

        it('should show author of first comment as', function () {
            element(by.model('sortBy')).sendKeys('author');
            expect(element.all(by.repeater('comment in dish.comments'))
                .count()).toEqual(7);
            var author = element.all(by.repeater('comment in dish.comments'))
                .first().element(by.binding('comment.author'));
            expect(author.getText()).toContain('25 Cent');
        });

        it('should show rating of first author as', function () {
            element(by.model('sortBy')).sendKeys('author');
            var rating = element.all(by.repeater('comment in dish.comments'))
                .first().element(by.binding('comment.rating'));
            expect(rating.getText()).toEqual('2 Stars');
        })
    });
});