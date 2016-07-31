describe("Controller: AboutController", function () {

    beforeEach(module('confusionApp', ['$urlRouterProvider', function ($urlRouterProvider) {

        // Do not intercept the $urlRouterProvider requesst for the views
        $urlRouterProvider.deferIntercept();

    }]));

    var AboutController, scope, $httpbackend;

    // Initialize the controller and mock scope
    beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, corporateFactory) {
        // placing mock dependencies
        $httpbackend = _$httpBackend_;

        $httpbackend.expectGET("http://localhost:3000/leadership").respond([
            {
                "id": 0,
                "name": "Peter Pan",
                "image": "images/alberto.png",
                "designation": "Chief Epicurious Officer",
                "abbr": "CEO",
                "description": "CEO description"
            },
            {
                "id": 1,
                "name": "Dhanasekaran Witherspoon",
                "image": "images/alberto.png",
                "designation": "Chief Food Officer",
                "abbr": "CFO",
                "description": "CFO description"
            }
        ]);

        scope = $rootScope.$new();

        AboutController = $controller('AboutController', {
            $scope: scope, corporateFactory: corporateFactory
        });

        $httpbackend.flush();
    }));

    // ----------------------------------------------------------------
    // Test cases to be started from here
    // ----------------------------------------------------------------
    
    it ('should create "leaders" with 2 leaders', function () {
        expect(scope.showLeaders).toBeTruthy();
        expect(scope.leaders).toBeDefined();
        expect(scope.leaders.length).toBe(2);
    });

    it('should have data in the correct order', function() {
        expect(scope.leaders[0].id).toBe(0);
        expect(scope.leaders[1].id).toBe(1);
    });
});