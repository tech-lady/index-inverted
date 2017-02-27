const invertedIndex = new InvertedIndex();

describe("Inverted Index", () => {

  /**
   * Test suite to ensure the validateFile method returns an object of
   * the correct index mapping
   */
  // this is test suite
  describe('Read book data', () => {


    invertedIndex.validateFile('books.json');


    it('Should ensure that JSON file is not empty', () => {
      const bookLength = Object.keys('books.json').length;
      expect(bookLength > 0).toEqual(true)

    });

    it('Should return true for valid json file', () => {
      expect(invertedIndex.validateFile(validBook)).toEqual(true);
    });

    it('Should return false if json does not contain title and text', () => {
      expect(invertedIndex.validateFile(invalidBook)).toEqual(false);
    });

  });
  /*
   * Populate Index Test Suite
   */
  describe('Populate Index', () => {
    invertedIndex.createIndex('books.json', validBook);

    it('Should ensure that index is created once the file has been read', () => {
      expect(invertedIndex.indices['books.json']).toBeDefined();
    });

    it('Should maps the string keys to the correct objects', () => {
      expect(invertedIndex.indices['books.json'].terms.alice).toEqual([1]);
      expect(invertedIndex.indices['books.json'].terms.and).toEqual([1, 2]);
      expect(invertedIndex.indices['books.json'].terms.lord).toEqual([2]);
    });


    it('Should return an object that is an accurate index of the content of the json file', () => {
      expect(invertedIndex.getIndex('books.json')).toBeDefined();
    });

  });


  /**
   * Test suite to ensure the getIndex method returns an object of
   * the correct index mapping
   */

  describe('Get index', () => {

    it('should return an object when value is found', () => {
      const indexedFile = invertedIndex.getIndex('books.json');
      expect(typeof(indexedFile) === 'object').toBeTruthy();
    });

    it('should contain valid indexed words and position', () => {
      expect(invertedIndex.getIndex('books.json').terms.alice).toEqual([1]);
      expect(invertedIndex.getIndex('books.json').terms.and).toEqual([1, 2]);
      expect(invertedIndex.getIndex('books.json').terms.lord).toEqual([2]);


    });

  });

  /**
   * Test suite to ensure the searchIndex method returns an object of
   * the correct index mapping
   */

  describe('Search Index', () => {

    invertedIndex.searchIndex('../books.json', 'alice');

    it('Should return correct index of the search term', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, a')[0]).toEqual({
        terms: {
          alice: [1],
          a: [1, 2]
        },
        count: 2,
        filePath: 'books.json'
      });
    });

    it('Should return books.json:[] when no result is found',
      () => {
        expect(invertedIndex.searchIndex('books.json', 'along')).toEqual([undefined]);
      });

    it('Should return correct index in an array search terms', () => {
      expect(invertedIndex.searchIndex('books.json', 'alice, [hole,[a]]')[0]).toEqual({
        terms: {
          alice: [1],
          hole: [1],
          a: [1, 2]
        },
        count: 2,
        filePath: 'books.json'
      });
    });
  });
});
