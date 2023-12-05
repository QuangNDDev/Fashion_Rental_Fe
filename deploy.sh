echo "Building app..."
npm run build

echo "Deploy files to server..."
scp -r -i ./fashion build/* root@167.71.221.112:/var/www/html/
echo "Done!"