/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    // This test suite is all about the RSS feeds definitions
    describe('RSS Feeds', function() {
        // to make sure that the allFeeds variable has been defined and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // ensure that every object in allFeed has a url defined and that the url is not empty
        it('urls should be define',function(){
            allFeeds.forEach(element => {
               expect(element.url).toBeDefined();
               expect(element.url.length).not.toBe(0)
            });
        });

        // ensures that every object in allFeed has a name defined and that the name is not empty
        it('names should be define',function(){
            allFeeds.forEach(element=>{
                expect(element.name).toBeDefined()
                expect(element.name.length).not.toBe(0)
            });
        });
    });

    // test suite for The menu functionality 
    describe('The Menu',function(){
        let menuClassName = document.getElementsByTagName('body')[0].className;
        // ensures the menu element is hidden by default
        it('should be hidden by default',function(){
            expect(menuClassName).toBe('menu-hidden')
        });

        // ensures the menu changes visibility when the menu icon is clicked.
        it('button should toggle on/off',function(){
            document.getElementsByClassName('menu-icon-link')[0].click()
            menuClassName = document.getElementsByTagName('body')[0].className;
            expect(menuClassName).not.toBe('menu-hidden')

            document.getElementsByClassName('menu-icon-link')[0].click()
            menuClassName = document.getElementsByTagName('body')[0].className;
            expect(menuClassName).toBe('menu-hidden')
        });
    });


    // test suite for the Initial Entries */
    describe('Initial Entries',function(){
        beforeEach(function(done){
            loadFeed(0,done);
        });
        // ensures when the loadFeed function is called and completes its work, there is at least a single entry element within the feed container.
        it('at least should be greater than one',function(){
           expect($('.entry-link').length).not.toBe(0); 
        });
    });
    
    //test suite for the New Feed Selection */
    describe('New Feed Selection',function(){
        let oldFeed;
        let newFeed;
        beforeEach(function(done){
            loadFeed(0,function(){
                oldFeed = document.documentElement.innerHTML;
                done();
            });
            loadFeed(1,function(){
                newFeed = document.documentElement.innerHTML;
                done();
            })
        });
        //ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        it('should be changed',function(done){
            expect(oldFeed).not.toEqual(newFeed);
            done();
        });
    });
}());
