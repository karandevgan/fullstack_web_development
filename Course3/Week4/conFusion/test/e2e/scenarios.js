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

        describe('defaultTests', function () {

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

    });

    describe('menu', function () {
        beforeAll(function () {
            browser.get('index.html#/menu');
        });

        describe('defaultTests', function () {

            it('should not have "Error:Message" element', function () {
                expect(browser.isElementPresent(by.binding('message'))).toBe(false);
            });

            it('should have "showDetails" as', function () {
                expect(element(by.binding('showDetails')).getText()).toBe("Show Details");
            });

            it('should not show detals by default', function () {
                element.all(by.repeater('dish in dishes')).then(function (dishes) {
                    dishes.forEach(function (dish) {
                        expect(dish.element(by.binding('dish.description')).isDisplayed()).toBeFalsy();
                    });
                });
            });

            it('should toggle details on click', function () {
                element(by.css('[ng-click="toggleDetails()"]')).click();
                expect(element(by.binding('showDetails')).getText()).toBe("Hide Details");
                element.all(by.repeater('dish in dishes')).then(function (dishes) {
                    dishes.forEach(function (dish) {
                        expect(dish.element(by.binding('dish.description')).isDisplayed()).toBeTruthy();
                    });
                });

                element(by.css('[ng-click="toggleDetails()"]')).click();
                expect(element(by.binding('showDetails')).getText()).toBe("Show Details");
                element.all(by.repeater('dish in dishes')).then(function (dishes) {
                    dishes.forEach(function (dish) {
                        expect(dish.element(by.binding('dish.description')).isDisplayed()).toBeFalsy();
                    });
                });
            });

        });

        describe('The Menu tab tests', function () {

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
                    .then(function (href) {
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
                    .then(function (href) {
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
                    .then(function (href) {
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
                    .then(function (href) {
                        expect(href.split('#')[1]).toBe('/menu/3');
                    });

                expect(elem.element(by.binding('dish.name')).getText())
                    .toBe('ElaiCheese Cake $2.99');
            });

        });

        describe('The Appetizers tab tests', function () {

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
                    .then(function (href) {
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
                    .then(function (href) {
                        expect(href.split('#')[1]).toBe('/menu/2');
                    });

                expect(elem.element(by.binding('dish.name')).getText())
                    .toBe('Vadonut New $1.99');
            });

        });

        describe('The Testing tab tests', function () {

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
                    .then(function (href) {
                        expect(href.split('#')[1]).toBe('/menu/0');
                    });

                expect(elem.element(by.binding('dish.name')).getText())
                    .toBe('Uthapizza Hot $4.99');
            });

        });

        describe('The Desserts tab tests', function () {

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
                    .then(function (href) {
                        expect(href.split('#')[1]).toBe('/menu/3');
                    });

                expect(elem.element(by.binding('dish.name')).getText())
                    .toBe('ElaiCheese Cake $2.99');
            });

        });

    });

    describe('menu/0', function () {
        beforeAll(function () {
            browser.get('index.html#/menu/0');
        });

        describe('defaultTests', function () {

            it('should not have Message element', function () {
                expect(browser.isElementPresent(by.binding('message'))).toBeFalsy();
            });

            it('should have dish name as', function () {
                expect(element(by.binding('dish.name')).getText()).toBe('Uthapizza Hot $4.99');
            });

            it('should have dish description as', function () {
                expect(element(by.binding('dish.description')).getText())
                    .toBe(
                    'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'
                    );
            });

            it('should have image as', function () {
                var img_src = element(by.css('[class="media-object img-thumbnail"]')).getAttribute('ng-src');
                expect(img_src).toBe('images/uthapizza.png');
            });

            it('should have number of comments as', function () {
                expect(element.all(by.repeater('comment in dish.comments')).count()).toBe(7);
            });

            it('should have submit button as disabled by default', function () {
                expect(element(by.css('[type="submit"]')).isEnabled()).toBeFalsy();
            });

            it('should have newComment preview hidden by default', function () {
                expect(element(by.id('newCommentPreview')).isDisplayed()).toBeFalsy();
            });

            it('should have default rating selected as', function () {
                expect(element(by.id('ratingCheckbox1')).isSelected()).toBeFalsy();
                expect(element(by.id('ratingCheckbox2')).isSelected()).toBeFalsy();
                expect(element(by.id('ratingCheckbox3')).isSelected()).toBeFalsy();
                expect(element(by.id('ratingCheckbox4')).isSelected()).toBeFalsy();
                expect(element(by.id('ratingCheckbox5')).isSelected()).toBeTruthy();
            });

            it('should have empty newCommentForm', function () {
                expect(element(by.model('newComment.author')).getAttribute('value')).toBe('');
                expect(element(by.model('newComment.comment')).getAttribute('value')).toBe('');
            });

            it('should not show errors in the comment form', function () {
                var form = element(by.id('commentForm'));

                form.all(by.css('.form-group'))
                    .then(function (formGroups) {
                        formGroups.forEach(function (group) {
                            group.getAttribute('class')
                                .then(function (classes) {
                                    expect(classes.split(' ').indexOf('has-error')).toBe(-1);
                                });
                        });
                    });

                form.all(by.css('.help-block'))
                    .then(function (helpBlocks) {
                        helpBlocks.forEach(function (helpBlock) {
                            expect(helpBlock.isDisplayed()).toBeFalsy();
                        });
                    });
            });

        });

        describe('sortBy author in increasing order', function () {
            beforeAll(function () {
                element(by.model('sortBy')).clear();
                element(by.model('sortBy')).sendKeys('author');
            });

            it('should have number of comments as', function () {
                expect(element.all(by.repeater('comment in dish.comments')).count()).toBe(7);
            });

            var firstComment = element.all(by.repeater('comment in dish.comments')).first();

            it('should have first author as', function () {
                var author = firstComment.element(by.binding('comment.author'));
                expect(author.getText()).toContain('25 Cent');
            });

            it('should have first comment as', function () {
                var comment = firstComment.element(by.binding('comment.comment'));
                expect(comment.getText()).toBe("It's your birthday, we're gonna party!");
            });

            it('should have rating as', function () {
                var rating = firstComment.element(by.binding('comment.rating'));
                expect(rating.getText()).toContain('2');
            });

        });

        describe('sortBy author in decreasing order', function () {
            beforeAll(function () {
                element(by.model('sortBy')).clear();
                element(by.model('sortBy')).sendKeys('-author');
            });

            it('should have number of comments as', function () {
                expect(element.all(by.repeater('comment in dish.comments')).count()).toBe(7);
            });

            var firstComment = element.all(by.repeater('comment in dish.comments')).first();

            it('should have first author as', function () {
                var author = firstComment.element(by.binding('comment.author'));
                expect(author.getText()).toContain('Ringo Starry');
            });

            it('should have first comment as', function () {
                var comment = firstComment.element(by.binding('comment.comment'));
                expect(comment.getText()).toBe("Ultimate, Reaching for the stars!");
            });

            it('should have rating as', function () {
                var rating = firstComment.element(by.binding('comment.rating'));
                expect(rating.getText()).toContain('4');
            });
        });

        describe('sortBy rating in increasing order', function () {
            beforeAll(function () {
                element(by.model('sortBy')).clear();
                element(by.model('sortBy')).sendKeys('rating');
            });

            it('should have number of comments as', function () {
                expect(element.all(by.repeater('comment in dish.comments')).count()).toBe(7);
            });

            var firstComment = element.all(by.repeater('comment in dish.comments')).first();

            it('should have first author as', function () {
                var author = firstComment.element(by.binding('comment.author'));
                expect(author.getText()).toContain('25 Cent');
            });

            it('should have first comment as', function () {
                var comment = firstComment.element(by.binding('comment.comment'));
                expect(comment.getText()).toBe("It's your birthday, we're gonna party!");
            });

            it('should have rating as', function () {
                var rating = firstComment.element(by.binding('comment.rating'));
                expect(rating.getText()).toContain('2');
            });
        });

        describe('sortBy rating in decreasing order', function () {
            beforeAll(function () {
                element(by.model('sortBy')).clear();
                element(by.model('sortBy')).sendKeys('-rating');
            });

            it('should have number of comments as', function () {
                expect(element.all(by.repeater('comment in dish.comments')).count()).toBe(7);
            });

            var firstComment = element.all(by.repeater('comment in dish.comments')).first();

            it('should have first author as', function () {
                var author = firstComment.element(by.binding('comment.author'));
                expect(author.getText()).toContain('John Lemon');
            });

            it('should have first comment as', function () {
                var comment = firstComment.element(by.binding('comment.comment'));
                expect(comment.getText()).toBe("Imagine all the eatables, living in conFusion!");
            });

            it('should have rating as', function () {
                var rating = firstComment.element(by.binding('comment.rating'));
                expect(rating.getText()).toContain('5');
            });
        });


        describe('sortBy date in increasing order', function () {
            beforeAll(function () {
                element(by.model('sortBy')).clear();
                element(by.model('sortBy')).sendKeys('date');
            });

            it('should have number of comments as', function () {
                expect(element.all(by.repeater('comment in dish.comments')).count()).toBe(7);
            });

            var firstComment = element.all(by.repeater('comment in dish.comments')).first();

            it('should have first author as', function () {
                var author = firstComment.element(by.binding('comment.author'));
                expect(author.getText()).toContain('25 Cent');
            });

            it('should have first comment as', function () {
                var comment = firstComment.element(by.binding('comment.comment'));
                expect(comment.getText()).toBe("It's your birthday, we're gonna party!");
            });

            it('should have rating as', function () {
                var rating = firstComment.element(by.binding('comment.rating'));
                expect(rating.getText()).toContain('2');
            });

            it('should have date as', function () {
                var date = firstComment.element(by.binding('comment.date'));
                expect(date.getText()).toContain('Dec 2, 2011');
            });
        });

        describe('sortBy date in decreasing order', function () {
            beforeAll(function () {
                element(by.model('sortBy')).clear();
                element(by.model('sortBy')).sendKeys('-date');
            });

            it('should have number of comments as', function () {
                expect(element.all(by.repeater('comment in dish.comments')).count()).toBe(7);
            });

            var firstComment = element.all(by.repeater('comment in dish.comments')).first();

            it('should have first author as', function () {
                var author = firstComment.element(by.binding('comment.author'));
                expect(author.getText()).toContain('Ankit');
            });

            it('should have first comment as', function () {
                var comment = firstComment.element(by.binding('comment.comment'));
                expect(comment.getText()).toBe("I didn't liked it much.");
            });

            it('should have rating as', function () {
                var rating = firstComment.element(by.binding('comment.rating'));
                expect(rating.getText()).toContain('2');
            });

            it('should have date as', function () {
                var date = firstComment.element(by.binding('comment.date'));
                expect(date.getText()).toContain('Jul 30, 2016');
            });
        });

        describe('write a comment', function () {
            beforeAll(function () {
                element(by.model('newComment.author')).sendKeys('Test Author');
                element(by.model('newComment.comment')).sendKeys('Test Comment');
                element(by.id('ratingCheckbox2')).click();
            });

            it('should have rating as', function () {
                expect(element(by.id('ratingCheckbox1')).isSelected()).toBeFalsy();
                expect(element(by.id('ratingCheckbox2')).isSelected()).toBeTruthy();
                expect(element(by.id('ratingCheckbox3')).isSelected()).toBeFalsy();
                expect(element(by.id('ratingCheckbox4')).isSelected()).toBeFalsy();
                expect(element(by.id('ratingCheckbox5')).isSelected()).toBeFalsy();
            });

            it('should have submit button as', function () {
                expect(element(by.css('[type="submit"]')).isEnabled()).toBe(true);
            });

            it('should show newCommentPreview', function () {
                expect(element(by.id('newCommentPreview')).isDisplayed()).toBeTruthy();
            });
            
            it('should have correct values in preview of comment', function () {
                expect(element(by.binding('newComment.author')).getText()).toContain('Test Author');
                expect(element(by.binding('newComment.rating')).getText()).toContain('2');
                expect(element(by.binding('newComment.comment')).getText()).toBe('Test Comment');
            });

        });

        describe('make form invalid', function () {

            beforeAll(function () {
                element(by.model('newComment.author')).clear();
                element(by.model('newComment.comment')).clear();
            });

            it('should show errors in the comment form', function () {
                var form = element(by.id('commentForm'));

                form.all(by.css('.form-group'))
                    .then(function (formGroups) {
                        formGroups.forEach(function (group) {
                            group.getAttribute('class')
                                .then(function (classes) {
                                    expect(classes.split(' ').indexOf('has-error') != -1).toBeTruthy;
                                });
                        });
                    });

                form.all(by.css('.help-block'))
                    .then(function (helpBlocks) {
                        helpBlocks.forEach(function (helpBlock) {
                            expect(helpBlock.isDisplayed()).toBeTruthy();
                        });
                    });
            });

            it('should hide newCommentPreview', function () {
                expect(element(by.id('newCommentPreview')).isDisplayed()).toBeFalsy();
            });

            it('should have submit button disabled', function(){
                expect(element(by.css('[type="submit"]')).isEnabled()).toBeFalsy();
            });

        });

    });
});