describe('Controller: MenuController', function () {

    beforeEach(module('confusionApp', ['$urlRouterProvider', function ($urlRouterProvider) {

        // Do not intercept the $urlRouterProvider requesst for the views
        $urlRouterProvider.deferIntercept();

    }]));

    var MenuController, scope, $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, menuFactory) {
        // place here mock dependencies 
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET("http://localhost:3000/dishes").respond([
            {
                "id": 0,
                "name": "Uthapizza",
                "image": "images/uthapizza.png",
                "category": "mains",
                "label": "Hot",
                "price": "4.99",
                "description": "A",
                "comments": [{}]
            },
            {
                "id": 1,
                "name": "Zucchipakoda",
                "image": "images/zucchipakoda.png",
                "category": "mains",
                "label": "New",
                "price": "4.99",
                "description": "A",
                "comments": [{}]
            }
        ]);

        scope = $rootScope.$new();

        MenuController = $controller('MenuController', {
            $scope: scope, menuFactory: menuFactory
        });

        $httpBackend.flush();

    }));



    // ----------------------------------------------------------------
    // Test cases to be started from here
    // ----------------------------------------------------------------

    it('should have showDetails as false', function () {
        expect(scope.showDetails).toBeFalsy();
    });

    it("should toggle the showDetails", function () {
        scope.toggleDetails()
        expect(scope.showDetails).toBeTruthy();
        scope.toggleDetails()
        expect(scope.showDetails).toBeFalsy();
    });

    it('should create "dishes" with 2 dishes fetched from the xhr', function () {
        expect(scope.showMenu).toBeTruthy();
        expect(scope.dishes).toBeDefined();
        expect(scope.dishes.length).toBe(2);
    });

    it('should have correct data order in the dishes', function () {
        expect(scope.dishes[0].id).toBe(0);
        expect(scope.dishes[1].id).toBe(1);
    });

    it('should change the tab selected based on tab clicked', function () {
        expect(scope.tab).toEqual(1);

        scope.select(2);
        expect(scope.tab).toEqual(2);
        expect(scope.isSelected(2)).toBeTruthy();
        expect(scope.filtText).toEqual('appetizer');

        scope.select(3);
        expect(scope.tab).toEqual(3);
        expect(scope.isSelected(3)).toBeTruthy();
        expect(scope.filtText).toEqual('mains');

        scope.select(4);
        expect(scope.tab).toEqual(4);
        expect(scope.isSelected(4)).toBeTruthy();
        expect(scope.filtText).toEqual('dessert');
    });

});