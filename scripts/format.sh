currentDir=${PWD}
declare -a projectDirs=(
  "./packages/server"
  "./packages/web"
  "."
)

for dir in "${projectDirs[@]}"
do
  echo "> $dir"
  prettier --write "${dir}/**/*{.ts,.tsx}"
done

echo "Formatted!"
