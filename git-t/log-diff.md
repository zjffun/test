```sh
git checkout -b test/diff1 master
echo 'foo' > test
git add test
git commit -m "test diff1"

git checkout -b test/diff2 master
echo 'foo' > test
git add test
git commit -m "test diff2"

# log

git log test/diff1..test/diff2
# = git log test/diff2 ^test/diff1 -> test diff2

git log test/diff1...test/diff2
# = git log test/diff1 test/diff2 ^master -> test diff1 & test diff2

# diff

git diff test/diff1..test/diff2
# = git diff test/diff1 test/diff2 -> empty

git diff test/diff1...test/diff2
# = git diff master test/diff2 -> foo

git checkout master
git branch -D test/diff1
git branch -D test/diff2
```
