describe("Controller: ContactController", function () {

    beforeEach(module('confusionApp'));

    var ContactController, scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        ContactController = $controller('ContactController', {
            $scope: scope
        });
    }));

    it('should have "feedback" and "channels" defined', function () {
        expect(scope.feedback).toBeDefined();
        expect(scope.channels).toBeDefined();
    });

    it('should have "feedback.mychannel" as empty', function () {
        expect(scope.feedback.mychannel).toBe("");
    });

    it('should have "feedback.firstName" as empty', function () {
        expect(scope.feedback.firstName).toBe("");
    });

    it('should have "feedback.lastName" as empty', function () {
        expect(scope.feedback.lastName).toBe("");
    });

    it('should have "feedback.agree" as false', function () {
        expect(scope.feedback.agree).toBeFalsy();
    });

    it('should have "feedback.email" as empty', function () {
        expect(scope.feedback.email).toBe("");
    });

    it('should have "invalidChannelSelection" as false', function () {
        expect(scope.invalidChannelSelection).toBeFalsy();
    });

    it('should have "channels" of length 2', function () {
        expect(scope.channels.length).toBe(2);
    });

    it('should have "channels" in correct order', function () {
        expect(scope.channels[0].value).toBe('tel');
        expect(scope.channels[0].label).toBe('Tel');

        expect(scope.channels[1].value).toBe('email');
        expect(scope.channels[1].label).toBe('Email');
    });
});