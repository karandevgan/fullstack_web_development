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