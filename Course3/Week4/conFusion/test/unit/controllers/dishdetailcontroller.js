describe("Controller: DishDetailController", function () {

    beforeEach(module('confusionApp', ['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }]));

    var DishDetailController, scope, $httpBackend, stateParams;

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, menuFactory) {

        $httpBackend = _$httpBackend_;
        var baseURL = 'http://localhost:3000/';

        stateParams = { id: 0 };

        $httpBackend.expectGET(baseURL + "dishes/" + stateParams.id).respond(
            {
                "id": 0,
                "name": "Uthapizza",
                "image": "images/uthapizza.png",
                "category": "mains",
                "label": "Hot",
                "price": 4.99,
                "description": "A",
                "comments": []
            }
        );

        scope = $rootScope.$new();

        DishDetailController = $controller('DishDetailController', {
            $scope: scope, menuFactory: menuFactory, $stateParams: stateParams
        });

        $httpBackend.flush();

    }));

    it('should create "dish" with 1 dish', function () {
        expect(scope.showDish).toBeTruthy();
        expect(scope.dish).toBeDefined();
        expect(scope.dish.id).toBe(0);
        expect(scope.dish.comments.length).toBe(0);
    });

    it('should have an initial empty "newComment"', function () {
        expect(scope.newComment).toBeDefined();
        expect(scope.newComment.rating).toBe(5);
        expect(scope.newComment.comment).toBe("");
        expect(scope.newComment.author).toBe("");
        expect(scope.newComment.date).toBe("");
    });


    describe("Posting a Comment", function () {

        beforeEach(function () {

            scope.newComment = {
                rating: 4,
                comment: "Test Comment",
                author: "Test Author",
                date: ""
            }

            scope.forms.commentForm = {
                $setPristine: function () {
                    return true;
                },
                $valid: true
            };

            scope.postComment();
        });

        it('should have commentForm defined', function () {
            expect(scope.forms).toBeDefined();
            expect(scope.forms.commentForm).toBeDefined();
        });

        it('should have successfully posted a "newComment"', function () {
            expect(scope.dish.comments.length).toBe(1);
            expect(scope.dish.comments[0].rating).toBe(4);
            expect(scope.dish.comments[0].comment).toBe("Test Comment");
            expect(scope.dish.comments[0].author).toBe("Test Author");
        });

    });

});