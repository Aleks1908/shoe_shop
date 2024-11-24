import bcrypt from 'bcrypt';

const hashManager = (function () {
    
    const saltRounds = 10;

    // Generate a hash from plain text and return it
    const generateHash = async (plainText) => {
        try {
            const salt = await bcrypt.genSalt(saltRounds); // Generate salt
            const hash = await bcrypt.hash(plainText, salt); // Generate hash
            return hash; // Return the hash
        } catch (err) {
            throw err; // Handle and propagate the error
        }
    };

    // Compare a plain text value to a stored hash
    const hashMatch = async (plainText, storedHash) => {
        try {
            const result = await bcrypt.compare(plainText, storedHash); // Compare plain text with the hash
            return result; // Return true if match, false otherwise
        } catch (err) {
            throw err; // Handle and propagate the error
        }
    };

    return {
        generateHash,
        hashMatch,
    };
})();

export { hashManager };
