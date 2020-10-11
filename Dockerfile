FROM node:lts-alpine
LABEL Author="danosori@bancolombia.com.co"

# Install dependencies
RUN apk add git \
        curl \
        python \
        --no-cache

# Install AWS CLI
RUN cd /tmp && \
	curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip" && \
	unzip awscli-bundle.zip && \
	 ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws && \
	 rm awscli-bundle.zip && rm -rf awscli-bundle

# Create app directory
WORKDIR /usr/src/app

# Copy sources
COPY src/* package.json ./

# Set environment file
ENV ENV="/root/.ashrc"
ENV NODE_PATH="/usr/local/lib/node_modules"

# Install Nequi modules
RUN npm install -g aws-sdk && \
    npm install -g dynamodb-doc

# Install project dependencies
RUN npm install

# Copy startup script
ADD customization/config.sh /opt/utils/config.sh

# Set execution permissions to the script
RUN chmod +x /opt/utils/config.sh

# Set startup script as entrypoint
CMD ["/opt/utils/config.sh"]

