# Changelog

## [3.1.1] - 2025-07-11
### Fixed
- Locale might not have been detected in some cases.
- Changed fallback locale from 'en-UK' (which was invalid) to 'en-GB'.

## [3.1.0] - 2025-07-11
### Changed
- Use tsup for bundling (previously webpack). No changes should be required in documented usage.

## [3.0.6] - 2025-07-03
### Changed
- Updated README.md, using tables to present information.

## [3.0.5] - 2025-07-03
### Changed
- Point bug report links directly to issue form.

## [3.0.4] - 2025-07-03
### Changed
- Bug report via separate issues repository. Removed bugs.email from package.json.

## [3.0.3] - 2025-07-02
### Changed
- License switch from zlib to MIT.
- Added bugs.email to package.json to provide an email for reporting issues.

## [3.0.2] - 2025-06-26
### Added
- Non-public field id __LIB_INFO__ to retrieve library information.

## [3.0.1] - 2025-06-25
### Fixed
- Improve README.md.

## [3.0.0] - 2025-06-15
### Cahnged
- **Breaking** Renamed to BraceFormat, @tspro/brace-format.
