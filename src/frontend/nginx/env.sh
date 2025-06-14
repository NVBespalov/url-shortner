#!/bin/sh

# Замена переменных окружения в JavaScript файлах
echo "Replacing environment variables in JS files..."
for file in /usr/share/nginx/html/static/js/main.*.js;
do
  if [ -f $file ]; then
    echo "Processing: $file"

    # Замена переменных
    sed -i "s|REACT_APP_API_URL_PLACEHOLDER|${REACT_APP_API_URL}|g" $file
    sed -i "s|REACT_APP_GA_ID_PLACEHOLDER|${REACT_APP_GA_ID}|g" $file

    echo "Processed: $file"
  fi
done

# Замена переменных в конфигурации nginx
echo "Configuring nginx..."
envsubst '${REACT_APP_API_URL} ${PORT}' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp
mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf

echo "Environment configuration completed"