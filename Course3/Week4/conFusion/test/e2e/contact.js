'use strict';

describe('Testing Scenario For Contact Us', function () {

    beforeAll(function () {
        browser.get('index.html#/contactus');
    });

    describe('default tests', function () {

        it('should have send feedback button as', function () {
            expect(element(by.cssContainingText('[type="submit"]', 'Send Feedback')).isEnabled()).toBeFalsy();
        });

        it('should have hidden channel list', function () {
            expect(element(by.id('selectChannelDiv')).isDisplayed()).toBeFalsy();
        });

        it('should have empty form', function () {
            expect(element(by.model('feedback.firstName')).getAttribute('value')).toBe('');
            expect(element(by.model('feedback.lastName')).getAttribute('value')).toBe('');
            expect(element(by.model('feedback.tel.areaCode')).getAttribute('value')).toBe('');
            expect(element(by.model('feedback.tel.number')).getAttribute('value')).toBe('');
            expect(element(by.model('feedback.email')).getAttribute('value')).toBe('');
            expect(element(by.model('feedback.comments')).getText()).toBe('');
            expect(element(by.model('feedback.agree')).getAttribute('checked')).toBeFalsy();
        });

        it('should toggle channel on agree', function () {
            element(by.model('feedback.agree')).click();
            expect(element(by.id('selectChannelDiv')).isDisplayed()).toBeTruthy();
            expect(element(by.model('feedback.mychannel')).all(by.tagName('option')).count()).toBe(3);
            expect(element(by.model('feedback.mychannel')).all(by.tagName('option')).get(0).getAttribute('selected')).toBe('true');
            element(by.model('feedback.agree')).click();
            expect(element(by.id('selectChannelDiv')).isDisplayed()).toBeFalsy();
        });

    });

    describe('write feedback', function () {
        it('should write to firstName', function () {
            element(by.model('feedback.firstName')).sendKeys('TestFirstName');
            expect(element(by.binding('feedback.firstName')).getText()).toContain('TestFirstName');
        });

        it('should write to lastName', function () {
            element(by.model('feedback.lastName')).sendKeys('TestLastName');
            expect(element(by.binding('feedback.lastName')).getText()).toContain('TestLastName');
        });

        it('should write to areacode', function () {
            element(by.model('feedback.tel.areaCode')).sendKeys('1234');
            expect(element(by.binding('feedback.tel.areaCode')).getText()).toContain('1234');
        });

        it('should write to telnumber', function () {
            element(by.model('feedback.tel.number')).sendKeys('567890');
            expect(element(by.binding('feedback.tel.number')).getText()).toContain('567890');
        });

    });

});