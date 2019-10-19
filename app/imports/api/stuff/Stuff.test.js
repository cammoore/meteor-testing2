import { Meteor } from 'meteor/meteor';
import { expect } from 'chai';
import { Stuffs } from './Stuff';

const removeAllEntities = () => {
  if (Meteor.isTest || Meteor.isAppTest) {
    Stuffs.remove({});
  } else {
    throw new Meteor.Error('removeAllEntities not called in testing mode.', '', Error().stack);
  }
  return true;
};

/* eslint prefer-arrow-callback: "off", no-unused-expressions: "off" */
/* eslint-env mocha */

if (Meteor.isServer) {
  describe('Stuffs', function testSuite() {
    before(function setup() {
      removeAllEntities();
    });

    after(function tearDown(done) {
      removeAllEntities();
      done();
    });

    it('#define', function testDefine(done) {
      const name = 'Name';
      const quantity = 5;
      const owner = 'cmoore';
      const condition = 'excellent';
      const id = Stuffs.insert({
        name,
        quantity,
        owner,
        condition,
      });
      // console.log(id);
      const doc = Stuffs.find({
        _id: id,
      }).fetch()[0];
      // console.log(doc);
      expect(doc).to.not.be.undefined;
      expect(doc.name).to.equal(name);
      done();
    });
  });
}
