const socketHandler = require('../server/socketHandler');

describe('Real Unit Test: Socket Logic', () => {
    test('should broadcast "sync-move" when "move" event is received', () => {
        // 1. Arrange: Create Mocks (Fake versions of io and socket)
        const mockEmit = jest.fn(); // A spy function to track calls
        
        const mockSocket = {
            // When our code calls socket.on('move', callback), we capture that callback
            on: jest.fn((event, callback) => {
                if (event === 'move') {
                    // Simulate the client sending data immediately
                    callback({ x: 10, y: 20 });
                }
            })
        };

        const mockIo = {
            // When our code calls io.on('connection', callback), we capture it
            on: jest.fn((event, callback) => {
                if (event === 'connection') {
                    // Simulate a user connecting immediately
                    callback(mockSocket);
                }
            }),
            emit: mockEmit // Attach our spy here
        };

        // 2. Act: Run your logic with the mocks
        socketHandler(mockIo);

        // 3. Assert: Verify the correct methods were called
        // Did we listen for connection?
        expect(mockIo.on).toHaveBeenCalledWith('connection', expect.any(Function));
        
        // Did we listen for the 'move' event?
        expect(mockSocket.on).toHaveBeenCalledWith('move', expect.any(Function));
        
        // CRITICAL: Did we actually emit the data back?
        expect(mockEmit).toHaveBeenCalledWith('sync-move', { x: 10, y: 20 });
    });
});