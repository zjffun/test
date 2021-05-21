```bash
function repeat(){
  for ((i=0;i<$1;i++)); do
    eval ${*:2}
  done
}

repeat 50 echo "foo" >> test
git hash-object -w test
git cat-file -t 61aeb6711fb95b2f9ffc6ea6e756e004edccc0f2
git cat-file -p 61aeb6711fb95b2f9ffc6ea6e756e004edccc0f2

echo "bar" >> test
git hash-object -w test
git cat-file -t ced83ca218300ba4f4ed3583e15dafbdbbe838da
git cat-file -p ced83ca218300ba4f4ed3583e15dafbdbbe838da

git write-tree --prefix=git-t
git add test
git write-tree --prefix=git-t
git reset -q @ -- test
# `git restore --source=@ --staged test` not work?
git write-tree --prefix=git-t

rm -f test
```