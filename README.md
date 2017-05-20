#Preview locally (windows)
C:\'Program Files'\Python\python.exe -m http.server 8000

#Sync to staging

aws s3 sync target s3://staging.chadwelldentalcare.co.uk --exclude "*/*" --exclude "*.html" --delete

aws s3 sync target s3://staging.chadwelldentalcare.co.uk --exclude "*" --include "*.html" --delete --content-type "text/html" --content-encoding gzip --cache-control max-age=1200

aws s3 sync target s3://staging.chadwelldentalcare.co.uk --exclude "*" --include "*.css" --delete --content-type "text/css" --content-encoding gzip --cache-control max-age=7776000

aws s3 sync target s3://staging.chadwelldentalcare.co.uk --exclude "*" --include "*.js" --delete --content-type "application/javascript" --content-encoding gzip --cache-control max-age=7776000

aws s3 sync target s3://staging.chadwelldentalcare.co.uk --exclude "*" --include "*.ico" --delete --cache-control max-age=86400

aws s3 sync target s3://staging.chadwelldentalcare.co.uk --delete --content-encoding gzip --cache-control max-age=7776000