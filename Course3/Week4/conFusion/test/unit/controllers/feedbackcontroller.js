describe("Controller: FeedbackController", function () {

    beforeEach(module('confusionApp', ['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }]));

    var FeedbackController, scope, $httpBackend;

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, feedbackFactory) {

        $httpBackend = _$httpBackend_;
        var baseURL = 'http://localhost:3000/';

        var feedback = {
            mychannel: "",
            firstName: "TestFirstName",
            lastName: "TestLastName",
            agree: false,
            email: "test@test.com"
        };

        var testDataWithChannel = {
            "mychannel": "tel",
            "firstName": "TestFirstName",
            "lastName": "TestLastName",
            "agree": true,
            "email": "test@test.com"
        };

        var testDataWithNoChannel = {
            "mychannel": "",
            "firstName": "TestFirstName",
            "lastName": "TestLastName",
            "agree": false,
            "email": "test@test.com"
        };

        $httpBackend.expectPOST(baseURL + "feedback").respond(
            {}
        );

        scope = $rootScope.$new();
        scope.feedback = feedback;
        scope.invalidChannelSelection = false;
        scope.feedbackForm = {
            $setPristine: function () {
                return true;
            }
        }

        FeedbackController = $controller("FeedbackController", {
            $scope: scope,
            feedbackFactory: feedbackFactory
        });

    }));

    describe('Post a feedback with "agree" as false', function () {

        it('should have "agree" as false', function () {
            expect(scope.feedback.agree).toBeFalsy();
        });

        it('should have "invalidChannelSelection" as false', function () {
            expect(scope.invalidChannelSelection).toBeFalsy();
        });

        describe("Posting feedback", function () {

            beforeEach(function () {
                scope.sendFeedback();
                $httpBackend.flush();
            });

            it('should have "invalidChannelSelection" as false', function () {
                expect(scope.invalidChannelSelection).toBeFalsy();
            });

            describe("Feeback should be empty", function () {
                it('should have "mychannel" as empty', function () {
                    expect(scope.feedback.mychannel).toBe("");
                });

                it('should have "firstName" as empty', function () {
                    expect(scope.feedback.firstName).toBe("");
                });

                it('should have "lastName" as empty', function () {
                    expect(scope.feedback.lastName).toBe("");
                });

                it('should have "agree" as false', function () {
                    expect(scope.feedback.agree).toBeFalsy;
                });

                it('should have "email" as empty', function () {
                    expect(scope.feedback.email).toBe("");
                });
            });

        });

    });

    describe('Post a invalid feedback with "agree" as true', function () {

        beforeEach(function () {
            scope.feedback.agree = true;
        });

        it('should have "agree" as true', function () {
            expect(scope.feedback.agree).toBeTruthy();
        });

        it('should have "invalidChannelSelection" as false', function () {
            expect(scope.invalidChannelSelection).toBeFalsy();
        });

        describe('Posting feedback', function () {
            beforeEach(function () {
                scope.sendFeedback();
            });

            it('should have "invalidChannelSelection" as true', function () {
                expect(scope.invalidChannelSelection).toBeTruthy();
            });

            describe("Feeback should be unchanged", function () {

                it('should have unchanged "mychannel"', function () {
                    expect(scope.feedback.mychannel).toBe("");
                });

                it('should have "firstName" as TestFirstName', function () {
                    expect(scope.feedback.firstName).toBe("TestFirstName");
                });

                it('should have "lastName" as TestLastName', function () {
                    expect(scope.feedback.lastName).toBe("TestLastName");
                });

                it('should have "agree" as true', function () {
                    expect(scope.feedback.agree).toBeTruthy();
                });

                it('should have "email" as test@test.com', function () {
                    expect(scope.feedback.email).toBe("test@test.com");
                });

            });

        });
    });

    describe('Post a valid feedback with "agree" as true', function () {

        beforeEach(function () {
            scope.feedback.agree = true;
            scope.feedback.mychannel = 'tel';
        });

        it('should have "agree" as true', function () {
            expect(scope.feedback.agree).toBeTruthy();
        });

        it('should have "invalidChannelSelection" as false', function () {
            expect(scope.invalidChannelSelection).toBeFalsy();
        });

        describe("Posting feedback", function () {

            beforeEach(function () {
                scope.sendFeedback();
                $httpBackend.flush();
            });

            it('should have "invalidChannelSelection" as false', function () {
                expect(scope.invalidChannelSelection).toBeFalsy();
            });

            describe("Feeback should be empty", function () {
                it('should have "mychannel" as empty', function () {
                    expect(scope.feedback.mychannel).toBe("");
                });

                it('should have "firstName" as empty', function () {
                    expect(scope.feedback.firstName).toBe("");
                });

                it('should have "lastName" as empty', function () {
                    expect(scope.feedback.lastName).toBe("");
                });

                it('should have "agree" as false', function () {
                    expect(scope.feedback.agree).toBeFalsy;
                });

                it('should have "email" as empty', function () {
                    expect(scope.feedback.email).toBe("");
                });
            });

        });

    });

});