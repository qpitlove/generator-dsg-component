//FIXME
'use strict';

describe('Factory: <%= cameledName %>', function () {

    // load the service's module
    beforeEach(module('<%= scriptAppName %>'));

    // instantiate service
    var <%= cameledName %>;
    beforeEach(inject(function (_<%= cameledName %>_) {
        <%= cameledName %> = _<%= cameledName %>_;
    }));

    it('should do something', function () {
        expect(!!<%= cameledName %>).toBe(true);
    });

});
