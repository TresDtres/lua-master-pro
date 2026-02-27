# Split Scripts for Large Lesson Files
# Bash script to split large TypeScript lesson files

# Files to split (name, line count)
# mes-10/03-testing-luaunit.ts (1224 lines)
# mes-10/04-modularity.ts (1311 lines)
# mes-10/05-design-patterns.ts (2040 lines)
# mes-10/06-framework-project.ts (2106 lines)
# mes-11/01-core-loop.ts (1630 lines)
# mes-11/02-content.ts (1592 lines)
# mes-11/05-bug-fixing.ts (1777 lines)

echo "Creating split files for large lesson modules..."

# For now, manually create the split files following this pattern:
# 1. Read original file
# 2. Extract theory + examples -> part1.ts
# 3. Extract interactive + exercise -> part2.ts
# 4. Update main file to import from parts

echo "Pattern to follow:"
echo "=================="
echo "1. Create file.part1.ts with theory and examples"
echo "2. Create file.part2.ts with interactive, miniExercise, resources"
echo "3. Update main file to import from parts"
echo ""
echo "Files remaining to split:"
echo "- mes-10/03-testing-luaunit.ts"
echo "- mes-10/04-modularity.ts"
echo "- mes-10/05-design-patterns.ts"
echo "- mes-10/06-framework-project.ts"
echo "- mes-11/01-core-loop.ts"
echo "- mes-11/02-content.ts"
echo "- mes-11/05-bug-fixing.ts"
