describe("Controller: IndexController", function () {

    beforeEach(module("confusionApp", ['$urlRouterProvider', function ($urlRouterProvider) {

        $urlRouterProvider.deferIntercept();

    }]));

    var IndexController, scope, _$httpBackend_;


    beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, menuFactory, corporateFactory) {
        var baseURL = "http://localhost:3000/";
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET(baseURL + "dishes/0").respond(
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

        $httpBackend.expectGET(baseURL + "promotions/0").respond(
            {
                "id": 0,
                "name": "Weekend Grand Buffet",
                "image": "images/buffet.png",
                "label": "New",
                "price": "19.99",
                "description": "F"
            }
        );

        $httpBackend.expectGET(baseURL + "leadership/3").respond(
            {
                "id": 3,
                "name": "Alberto Somayya",
                "image": "images/alberto.png",
                "designation": "Executive Chef",
                "abbr": "EC",
                "description": "Award winning"
            }
        );

        scope = $rootScope.$new();

        IndexController = $controller('IndexController', {
            $scope: scope, menuFactory: menuFactory, corporateFactory: corporateFactory
        });

        $httpBackend.flush();

    }));


    // ----------------------------------------------------------------
    // Test cases to be started from here
    // ----------------------------------------------------------------

    it ('should create "featuredDish"', function() {
        expect(scope.showFeaturedDish).toBeTruthy();
        expect(scope.featuredDish).toBeDefined();
        expect(scope.featuredDish.id).toBe(0);
    });

    it ('should create "promotionDish"', function() {
        expect(scope.showPromotionDish).toBeTruthy();
        expect(scope.promotionDish).toBeDefined();
        expect(scope.promotionDish.id).toBe(0);
    });

    it ('should create "executiveChef"', function() {
        expect(scope.showExecutiveChef).toBeTruthy();
        expect(scope.executiveChef).toBeDefined();
        expect(scope.executiveChef.id).toBe(3);
    });
});