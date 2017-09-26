

OBJ_FILES:=main.o
LDFLAGS="-Lsocket.io-client-cpp -lsioclient"
CXXFLAGS="-I./socket.io-client-cpp/src"
APP_NAME="flowSense"

all: $(OBJ_FILES)
	clang++ $(LDFLAGS) $(OBJ_FILES) -o $(APP_NAME)

.PHONY: clean
clean:
	rm -rf *.o $(APP_NAME)